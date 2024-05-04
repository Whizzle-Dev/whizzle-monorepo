import { useRouter } from 'next/navigation';
import { FeatureNotSetup } from '@/components/FeatureNotSetup';

export const SetupCheckInsView = () => {
  const router = useRouter();

  return (
    <FeatureNotSetup
      action="Setup Check-Ins"
      description={
        "Looks like you haven't configured check-ins for your organization. Setup check-ins to enable employees to use them. If you are an employee contact your account administrator."
      }
      onAction={() => router.push('/app/dashboard/check-in/settings/setup')}
    />
  );
};
