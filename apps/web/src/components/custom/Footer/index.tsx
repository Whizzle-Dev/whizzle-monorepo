// import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full py-12 md:py-24 border-t">
      <div className="container grid gap-8 px-4 text-sm md:grid-cols-2 md:px-6 lg:gap-12">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Whizzle is a platform that helps businesses streamline their
              operations. Our mission is to make work easier and more productive
              for everyone.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <GithubIcon className="w-4 h-4 fill-gray-500" />
              <a
                href="https://github.com/Whizzle-Dev"
                className="text-gray-500 dark:text-gray-400"
              >
                @whizzle-dev
              </a>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Email: support@whizzle.app
            </p>
          </div>
        </div>
        {/*<div className="grid gap-4 md:grid-cols-2">*/}
        {/*  <div className="flex flex-col gap-1">*/}
        {/*    <h3 className="text-lg font-semibold">Links</h3>*/}
        {/*    <ul className="grid gap-2">*/}
        {/*      <li>*/}
        {/*        <Link href="/">Terms of Service</Link>*/}
        {/*      </li>*/}
        {/*      <li>*/}
        {/*        <Link href="/">Privacy Policy</Link>*/}
        {/*      </li>*/}
        {/*    </ul>*/}
        {/*  </div>*/}
        {/*  <div className="flex flex-col gap-1">*/}
        {/*    <h3 className="text-lg font-semibold">Resources</h3>*/}
        {/*    <ul className="grid gap-2">*/}
        {/*      <li>*/}
        {/*        <Link href="/">Blog</Link>*/}
        {/*      </li>*/}
        {/*      <li>*/}
        {/*        <Link href="/">Documentation</Link>*/}
        {/*      </li>*/}
        {/*      <li>*/}
        {/*        <Link href="/">Case Studies</Link>*/}
        {/*      </li>*/}
        {/*    </ul>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </footer>
  );
}

function GithubIcon(props: any) {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
