import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { ReactNode } from 'react';

type SummaryBoxProps = {
  name: string;
  title: ReactNode;
  description: ReactNode | null;
  icon?: ReactNode;
};

export const SummaryBox = ({
  name,
  title,
  description,
  icon,
}: SummaryBoxProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{title}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};
