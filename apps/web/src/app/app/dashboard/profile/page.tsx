'use client';

import { withAuth } from '@/domain/auth/withAuth';
import { Separator } from '@/components/ui/separator';
import { FormInput } from '@/components/ui/form/form-input';
import { FormProvider, useForm } from 'react-hook-form';
import { Icons } from '@/components/ui/icons';
import {
  GetCurrentUserDocument,
  GetCurrentUserQuery,
  useDeleteUserProfilePhotoMutation,
  useGetCurrentUserQuery,
  useGetFileUploadUrlLazyQuery,
  useSaveBankDetailsMutation,
  useSaveUserDetailsMutation,
  useSaveUserProfilePhotoMutation,
} from '@/generated';
import { FormDateInput } from '@/components/ui/form/form-date-input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { getAbbreviation } from '@/lib/utils';
import { ProfileImageDialog } from '@/app/app/dashboard/profile/ProfileImageDialog';
import { FileMeta } from '@/app/app/dashboard/profile/FileMeta';

interface PersonalDetailsFormValues {
  fullName: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
}

interface BankDetailsFormValues {
  bankName: string;
  bankAccountNumber: string;
}

function ProfilePage() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [saveDetailsMutation] = useSaveUserDetailsMutation({
    refetchQueries: [GetCurrentUserDocument],
    onCompleted: () => {
      toast({
        variant: 'default',
        title: 'Successfully saved personal details',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Failed to save personal details',
      });
    },
  });

  const [deleteImageMutation] = useDeleteUserProfilePhotoMutation({
    refetchQueries: [GetCurrentUserDocument],
    onCompleted: () => {
      toast({
        variant: 'default',
        title: 'Successfully deleted profile photo',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Failed to delete profile photo',
      });
    },
  });

  const [saveBankDetails] = useSaveBankDetailsMutation({
    refetchQueries: [GetCurrentUserDocument],
    onCompleted: () => {
      toast({
        variant: 'default',
        title: 'Successfully saved bank details',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Failed to save bank details',
      });
    },
  });

  const { data } = useGetCurrentUserQuery({
    fetchPolicy: 'cache-first',
  });

  const personaLDetailsForm = useForm<PersonalDetailsFormValues>({
    defaultValues: {
      address: data?.currentUser.address ?? '',
      dateOfBirth: data?.currentUser.dateOfBirth ?? '',
      fullName: data?.currentUser.name ?? '',
      phoneNumber: data?.currentUser.phoneNumber ?? '',
    },
    mode: 'all',
  });

  const bankInformationForm = useForm<BankDetailsFormValues>({
    defaultValues: {
      bankAccountNumber:
        data?.currentEmployee.bankInformation?.bankAccountNumber ?? '',
      bankName: data?.currentEmployee.bankInformation?.bankName ?? '',
    },
  });

  useEffect(() => {
    personaLDetailsForm.reset({
      address: data?.currentUser.address ?? '',
      dateOfBirth: data?.currentUser.dateOfBirth ?? '',
      fullName: data?.currentUser.name ?? '',
      phoneNumber: data?.currentUser.phoneNumber ?? '',
    });
  }, [data?.currentUser]);

  useEffect(() => {
    bankInformationForm.reset({
      bankAccountNumber:
        data?.currentEmployee.bankInformation?.bankAccountNumber ?? '',
      bankName: data?.currentEmployee.bankInformation?.bankName ?? '',
    });
  }, [data?.currentEmployee]);

  const onSubmit = (formValues: PersonalDetailsFormValues) => {
    saveDetailsMutation({
      variables: {
        personalDetails: {
          ...formValues,
        },
      },
    });
  };

  const onSubmitBankDetails = (formValues: BankDetailsFormValues) => {
    saveBankDetails({
      variables: {
        bankDetails: {
          ...formValues,
        },
      },
    });
  };

  const [getProfilePhotoUploadUrl] = useGetFileUploadUrlLazyQuery();
  const [savePhoto] = useSaveUserProfilePhotoMutation();

  const [savingPhoto, setSavingPhoto] = useState(false);
  const handleFileChange = async (blob: Blob, meta: FileMeta) => {
    setSavingPhoto(true);
    const { data } = await getProfilePhotoUploadUrl({
      variables: {
        fileName: meta.name,
      },
    });
    // Specify the URL where you want to upload the file.
    const uploadUrl = data?.getFileUploadUrl.url;

    if (!uploadUrl) {
      setSavingPhoto(false);
      return;
    }
    try {
      // Make a POST request using the fetch API.
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        body: new File([blob], meta.name, { type: meta.type }),
        headers: {
          'Content-Type': meta.type,
        },
      });
      if (response.ok && data?.getFileUploadUrl.fileName) {
        await savePhoto({
          variables: {
            fileName: data.getFileUploadUrl.fileName,
          },
          update(cache, response) {
            const cachedData = cache.readQuery<GetCurrentUserQuery>({
              query: GetCurrentUserDocument,
            });

            cache.writeQuery({
              query: GetCurrentUserDocument,
              data: {
                ...cachedData,
                currentUser: {
                  ...cachedData?.currentUser,
                  profilePhotoUrl: response.data?.saveUserProfilePhoto,
                },
              },
            });
          },
        });
      }

      toast({
        variant: 'default',
        title: 'Profile image has been updated.',
      });
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Failed to update the profile image',
      });
    } finally {
      setSavingPhoto(false);
    }
  };

  const profileUrl = data?.currentUser.profilePhotoUrl;
  return (
    <>
      <div className="flex flex-row items-center gap-4">
        <div
          className="group relative cursor-pointer"
          onClick={() => setOpen(true)}
        >
          {profileUrl ? (
            <img
              className="w-[78px] h-[78px] rounded-full border-4 border-gray-300"
              src={profileUrl}
            />
          ) : (
            <div className="w-[78px] h-[78px] rounded-full border-4 border-gray-300 flex items-center justify-center">
              {data?.currentUser.name && getAbbreviation(data.currentUser.name)}
            </div>
          )}
          <div className="hidden justify-center items-center group-hover:flex absolute group-hover:z-10 group-hover:right-1 group-hover:bottom-1 w-[26px] h-[26px] bg-white border-2 border-gray-400 rounded-full">
            <Icons.Edit2 size={14} className="text-gray-400" />
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold tracking-tight">
            {data?.currentUser.name}
          </h2>
          <p className="text-muted-foreground">
            {data?.currentEmployee.role?.name}
          </p>
        </div>
      </div>
      <Separator className="my-6" />

      <div className="flex flex-col max-w-screen-sm mb-4">
        <FormProvider {...personaLDetailsForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={personaLDetailsForm.handleSubmit(onSubmit)}
          >
            <h2 className="text-xl font-bold tracking-tight">
              Personal Details
            </h2>
            <FormInput field="fullName" label="Full Name" />
            <FormInput field="phoneNumber" label="Phone Number" />
            <FormInput field="address" label="Address" />
            <FormDateInput
              label="Date of Birth"
              field="dateOfBirth"
              isDisabled={(date) => date > new Date()}
            />
            <Button
              className="w-fit ml-auto"
              disabled={!personaLDetailsForm.formState.isDirty}
            >
              Save
            </Button>
          </form>
        </FormProvider>
      </div>
      <div className="flex flex-col gap-4 max-w-screen-sm mb-4">
        <FormProvider {...bankInformationForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={bankInformationForm.handleSubmit(onSubmitBankDetails)}
          >
            <h2 className="text-xl font-bold tracking-tight">
              Bank Information
            </h2>
            <FormInput field="bankName" label="Bank Name" />
            <FormInput field="bankAccountNumber" label="Account Number" />
            <Button
              className="w-fit ml-auto"
              disabled={!bankInformationForm.formState.isDirty}
            >
              Save
            </Button>
          </form>
        </FormProvider>
      </div>
      <ProfileImageDialog
        open={open}
        onOpenChange={setOpen}
        profileUrl={profileUrl}
        onSave={handleFileChange}
        onDelete={() => deleteImageMutation()}
        loading={savingPhoto}
      />
    </>
  );
}

export default withAuth(ProfilePage);
