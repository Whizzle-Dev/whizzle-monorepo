import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Header() {
  return (
    <header className="mx-auto w-full max-w-5xl md:max-w-6xl px-5 py-5 md:py-7 items-center justify-between font-mono text-sm lg:flex relative">
      <div className="flex items-center gap-4">
        <img src="/logo.svg" alt="logo" className="h-8 w-8" />
        <h2 className="font-bold text-slate-700 text-xl">Whizzle</h2>
      </div>
      <div className="z-10 flex gap-2 h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <Link href="/auth/login">
          <Button variant="secondary">Log in</Button>
        </Link>
        <Link href="/auth/signup">
          <Button>Sign up</Button>
        </Link>
      </div>
    </header>
  );
}
