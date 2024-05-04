import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormElements } from '@/domain/check-in/manage/types';

type FormPreviewProps = {
  formElements: FormElements;
};
export const FormPreview = ({ formElements }: FormPreviewProps) => {
  return (
    <div className="flex flex-col">
      <span className="text-xl font-bold mb-4">Form Preview</span>
      <div className="gap-4 grid">
        {formElements.map((element, index) => {
          if (element.question)
            return (
              <div className="flex flex-col gap-2" key={index}>
                <span>{element.question ?? ''}</span>
                {element.type === 'short_answer' && <Input />}
                {element.type === 'long_answer' && <Textarea />}
                {element.type === 'rating' && (
                  <div className="flex gap-4">
                    <Icons.Star />
                    <Icons.Star />
                    <Icons.Star />
                    <Icons.Star />
                    <Icons.Star />
                  </div>
                )}
              </div>
            );
        })}
      </div>
    </div>
  );
};
