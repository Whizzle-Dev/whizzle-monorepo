import { Button } from './ui/button';
import { Card } from './ui/card';
import { ReactNode } from 'react';

type OptionCardProps = {
  title: string;
  description: string;
  cta?: string;
  onClick?: () => void;
  children?: ReactNode;
  menu?: ReactNode;
};
export const OptionCard = ({
  title,
  description,
  cta,
  onClick,
  children,
  menu,
}: OptionCardProps) => {
  return (
    <Card className="w-64 justify-center p-4 relative">
      <h3 className="text-xl mb-2">{title}</h3>
      {menu && <div className="absolute right-2 top-2">{menu}</div>}
      <p className="text-gray-500 mb-4">{description}</p>
      {children}
      {cta && <Button onClick={onClick}>{cta}</Button>}
    </Card>
  );
};
