'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { Button, ButtonLink } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main role="alert" className="min-h-dvh bg-bg">
      <div className="container-site flex min-h-dvh flex-col items-start justify-center gap-6">
        <Link href="/" aria-label="Home">
          <Logo />
        </Link>
        <p className="label mt-6">(Something went wrong)</p>
        <h1 className="type-display-sm max-w-[1000px]">This one broke on our side.</h1>
        <p className="type-lead max-w-[640px]">
          An unexpected error stopped the page from loading. Try again, or head back home.
        </p>
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:gap-3.5">
          <Button onClick={() => unstable_retry()}>Try again</Button>
          <ButtonLink href="/" variant="secondary">
            Return home
          </ButtonLink>
        </div>
        {error.digest && <p className="type-mono">Error ID: {error.digest}</p>}
      </div>
    </main>
  );
}
