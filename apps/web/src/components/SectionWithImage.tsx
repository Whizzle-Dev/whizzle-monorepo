type SectionWithImageProps = {
  title: string;
  description: string;
  imageSrc: string;
  features: string[];
  imageOnRight: boolean;
};
export const SectionWithImage = ({
  title,
  description,
  imageSrc,
  features,
  imageOnRight,
}: SectionWithImageProps) => {
  const image = (
    <img
      alt="Image"
      className="mx-auto overflow-hidden rounded-xl object-contain sm:w-full"
      height="310"
      src={imageSrc}
      width="550"
    />
  );

  const text = (
    <div className="flex flex-col justify-center space-y-4">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold space">{title}</h2>
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
