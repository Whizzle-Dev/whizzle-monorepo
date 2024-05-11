import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Header() {
  return (
    <header className="mx-auto w-full max-w-5xl md:max-w-6xl px-5 py-5 md:py-7 items-center justify-between font-mono text-sm flex relative">
      <div className="flex items-center gap-4 xl:w-fit">
        <img src="/logo.svg" alt="logo" className="h-8 w-8" />
        <h2 className="font-bold text-slate-700 text-xl">Whizzle</h2>
      </div>
      <div className="flex gap-2 items-end">
        <Link href="/auth/login">
          <Button variant="default">Login</Button>
        </Link>
      </div>
    </header>
  );
}
