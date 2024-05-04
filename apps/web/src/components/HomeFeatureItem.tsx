import { ReactNode } from 'react';

type HomeFeatureItemProps = {
  label: string;
  icon: ReactNode;
};
export const HomeFeatureItem = ({ label, icon }: HomeFeatureItemProps) => {
  return (
    <div className="flex flex-row gap-2">
      {icon}
      <span className="text-lg">{label}</span>
    </div>
  );
};
