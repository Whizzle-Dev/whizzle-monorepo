import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import Cropper, { Area, Point } from 'react-easy-crop';
import { useEffect, useRef, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { FileMeta } from '@/app/app/dashboard/profile/FileMeta';
import getCroppedImg, { readFile } from '@/lib/file';

type ProfileImageDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileUrl?: string | null;
  onSave: (blob: Blob, fileMeta: FileMeta) => void;
  onDelete: () => void;
  loading: boolean;
};

const DEFAULT_PROFILE_IMAGE = '/circle-user-round.svg';

export const ProfileImageDialog = ({
  open,
  onOpenChange,
  profileUrl,
  onSave,
  onDelete,
  loading,
}: ProfileImageDialogProps) => {
  const [currentImage, setCurrentImage] = useState(
    profileUrl ?? DEFAULT_PROFILE_IMAGE,
  );
  const [fileMeta, setFileMeta] = useState<FileMeta | null>(null);
  useEffect(() => {
    setCurrentImage(profileUrl ?? DEFAULT_PROFILE_IMAGE);
  }, [profileUrl]);

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [cropping, setCropping] = useState(false);
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileUpload = () => {
    // Trigger a click event on the hidden file input
    // @ts-expect-error todo fix
    fileInputRef.current.click();
  };

  const handleSave = async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(
          currentImage,
          croppedAreaPixels,
        );
        if (croppedImage && fileMeta) {
          setCurrentImage(croppedImage.url);
          setCropping(false);
          onSave(croppedImage.file, fileMeta);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const file = await readFile(selectedFile);
      if (typeof file === 'string') {
        setCurrentImage(file);
        setCropping(true);
        setFileMeta({
          type: selectedFile.type,
          name: selectedFile.name,
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile image</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center w-full">
          <div className="flex justify-center items-center mt-4 border-1 p-4 rounded-md relative h-[220px] w-full">
            {cropping ? (
              <Cropper
                cropShape="rect"
                image={currentImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            ) : (
              <img className="w-48 h-48 rounded-full" src={currentImage} />
            )}
          </div>
        </div>
        {cropping && (
          <div className="items-center left-2 bottom-2 flex gap-4">
            <Slider
              name="zoom"
              defaultValue={[1]}
              max={5}
              step={0.05}
              min={1}
              className="w-[60%]"
              onValueChange={(value) => value[0] && setZoom(value[0])}
            />
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {cropping ? (
          <div className="flex gap-4 justify-end w-full">
            <Button
              variant="secondary"
              onClick={() => {
                setCropping(false);
                setCurrentImage(profileUrl ?? DEFAULT_PROFILE_IMAGE);
                setFileMeta(null);
                setCrop({ x: 0, y: 0 });
              }}
            >
              Dismiss
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        ) : (
          <div className="right-2 flex flex-col gap-4">
            <Button
              variant="default"
              className="gap-2 text-white"
              onClick={triggerFileUpload}
              loading={loading}
            >
              Upload New Image <Icons.Upload size={16} />
            </Button>
            {profileUrl && (
              <Button
                variant="destructive"
                className="gap-2 text-white"
                onClick={onDelete}
              >
                Delete <Icons.Trash2 size={16} />
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
