import { Layout } from '@/components/custom';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { HomeFeatureItem } from '@/components/HomeFeatureItem';
import { Metadata } from 'next';
import { SectionWithImage } from '@/components/SectionWithImage';
import Link from 'next/link';
import { PrivateBetaDialog } from '@/app/PrivateBetaDialog';

export const metadata: Metadata = {
  title: 'Whizzle',
  description:
    'Streamline your business operation with all-in-one management platform',
  openGraph: {
    title: 'Whizzle | Unleash Your Startup Potential, All in One Place!',
    description:
      'Streamline your business operation with all-in-one management platform',
    images: [
      {
        url: 'https://whizzle.app/logo.svg',
        width: 500,
        height: 500,
        alt: 'Logo',
      },
    ],
  },
  keywords: [
    'startup',
    'management',
    'platform',
    'time tracking',
    'pto',
    'paid time leave',
    'task management',
    'knowledge base',
    'human resources',
    'hr',
    'employee onboarding',
    'check-ins',
    'open source',
    'github',
  ],
};

export default function Home() {
  return (
    <Layout>
      <div className="w-full flex flex-col justify-center items-center pt-8">
        <p className="text-5xl font-bold text-center max-w-[800px] mt-10 leading-snug">
          Streamline your business operation with all-in-one management platform
        </p>
        <div className="grid xl:grid-cols-4 xl:grid-rows-2 mt-20 gap-4">
          <HomeFeatureItem label="Time Tracking" icon={<Icons.Clock />} />
          <HomeFeatureItem label="Task Management" icon={<Icons.ListTodo />} />
          <HomeFeatureItem
            label="Employee Onboarding"
            icon={<Icons.HelpingHandIcon />}
          />
          <HomeFeatureItem label="PTO Tracking" icon={<Icons.PalmtreeIcon />} />
          <HomeFeatureItem label="Check-Ins" icon={<Icons.ClipboardEdit />} />
          <HomeFeatureItem label="Knowledge Base" icon={<Icons.FileText />} />
          <HomeFeatureItem label="Human Resources" icon={<Icons.User />} />
          <HomeFeatureItem label="Open Source" icon={<Icons.Github />} />
        </div>

        <div className="xl:flex-row flex flex-col items-center xl:mt-20 xl:mb-10 mt-10 mb-5 gap-4">
          <Button size="xl" className="" asChild variant="secondary">
            <Link
              href={'https://github.com/Whizzle-Dev/whizzle-monorepo' as any}
            >
              Star us on GitHub
              <Icons.Github className="ml-2" />
            </Link>
          </Button>
          <PrivateBetaDialog />
        </div>
      </div>
      <div className="my-8">
        <SectionWithImage
          title="Time Tracking"
          description="Track time spent on tasks and projects. Get insights into your team's productivity and performance."
          imageSrc="/showcase/time-tracking.png"
          features={[
            'Billable and non-billable hours tracking.',
            'Automated timesheets and reports.',
            'Integrations with popular project management tools.',
          ]}
          imageOnRight={true}
        />
      </div>
      <div className="my-8">
        <SectionWithImage
          title="PTO Tracking"
          description="Manage and track paid time off, sick leaves, and holidays. Ensure transparency and fairness in leave policies."
          imageSrc="/showcase/pto-tracking.png"
          features={[
            'Track and manage all types of leaves.',
            'Automated leave balance calculation.',
            'Integration with calendars and reminders.',
          ]}
          imageOnRight={false}
        />
      </div>
      <div className="my-8">
        <SectionWithImage
          title="Task Management"
          description="Organize and prioritize your projects in a fun, flexible, and rewarding way. Track progress and deadlines with ease."
          imageSrc="/showcase/pm.png"
          features={[
            'Create, assign, and track tasks.',
            'Set priorities and deadlines.',
            'Collaborate with team members.',
          ]}
          imageOnRight={true}
        />
      </div>

      <div className="my-8">
        <SectionWithImage
          title="Knowledge Base"
          description="Centralize your team's knowledge and information. Make it easy for your team to find and share information."
          imageSrc="/showcase/knowledge-base.png"
          features={[
            'Create and manage knowledge articles.',
            'Powerful search functionality.',
            'Collaborate and share knowledge.',
          ]}
          imageOnRight={false}
        />
      </div>

      <div className="my-8">
        <SectionWithImage
          title="Human Resources"
          description="Manage your team's information, performance, and development. Streamline HR processes and improve employee engagement."
          imageSrc="/showcase/hr.png"
          features={[
            'Employee profiles and records.',
            'Performance reviews and feedback.',
            'Training and development plans.',
          ]}
          imageOnRight={true}
        />
      </div>
    </Layout>
  );
}
