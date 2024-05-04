import { Layout } from '@/components/custom';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { HomeFeatureItem } from '@/components/HomeFeatureItem';
import { Metadata } from 'next';

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
          imageSrc="/time-tracking-showcase.png"
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
          imageSrc="/pto-tracking-showcase.png"
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
          imageSrc="/pm-showcase.png"
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
          imageSrc="/knowledge-base-showcase.png"
          features={[
            'Create and manage knowledge articles.',
            'Powerful search functionality.',
            'Collaborate and share knowledge.',
          ]}
          imageOnRight={false}
        />
      </div>
    </Layout>
  );
}

type SectionWithImageProps = {
  title: string;
  description: string;
  imageSrc: string;
  features: string[];
  imageOnRight: boolean;
};
const SectionWithImage = ({
  title,
  description,
  imageSrc,
  features,
  imageOnRight,
}: SectionWithImageProps) => {
  const image = (
    <img
      alt="Image"
      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
      height="310"
      src={imageSrc}
      width="550"
    />
  );

  const text = (
    <div className="flex flex-col justify-center space-y-4">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          {title}
        </h2>
        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          {description}
        </p>
      </div>
      <ul className="grid gap-2 py-4">
        {features.map((feature, index) => (
          <li key={index}>
            <CheckIcon className="mr-2 inline-block h-4 w-4" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="bg-gray-50/90 rounded-md">
      <div className="py-12 px-6 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            {imageOnRight ? [text, image] : [image, text]}
          </div>
        </div>
      </div>
    </div>
  );
};

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
