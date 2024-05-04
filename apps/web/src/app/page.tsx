import { Layout } from '@/components/custom';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { HomeFeatureItem } from '@/components/HomeFeatureItem';
import { Metadata } from 'next';
import { SectionWithImage } from '@/components/SectionWithImage';

export const metadata: Metadata = {
  title: 'Whizzle',
  description:
    'Streamline Your Business Operation with Our All-in-One Management Platform.',
};

export default function Home() {
  return (
    <Layout>
      <div className="w-full flex flex-col justify-center items-center pt-8">
        <p className="text-4xl text-center max-w-lg">
          Streamline Your Business Operation with Our All-in-One Management
          Platform.
        </p>
        <div className="grid grid-cols-4 grid-rows-2 mt-20 gap-4">
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
          <HomeFeatureItem label="Free & Open Source" icon={<Icons.Github />} />
        </div>

        <Button size="xl" className="mt-20 mb-10">
          Star us on GitHub
        </Button>
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
