import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { ArrowRightIcon } from './icons';

export type ButtonVariant = 'primary' | 'secondary' | 'inverted' | 'secondary-on-dark';
export type ButtonSize = 'default' | 'nav';

type StyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Full width below `md`, as in the mobile artboards. Defaults to true. */
  fullOnMobile?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-ink border-ink hover:bg-accent-hover',
  secondary: 'bg-transparent text-ink border-ink hover:bg-hover-soft',
  inverted: 'bg-ink text-paper border-ink hover:bg-ink/85',
  'secondary-on-dark': 'bg-transparent text-paper border-paper hover:bg-paper/10',
};

const sizes: Record<ButtonSize, string> = {
  default: 'h-[52px] px-[22px] text-base xl:px-[26px]',
  nav: 'h-11 px-[22px] text-[15px]',
};

export function buttonClasses({
  variant = 'primary',
  size = 'default',
  fullOnMobile = true,
}: StyleOptions = {}) {
  return cn(
    'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full border',
    'font-sans leading-none font-semibold whitespace-nowrap',
    'transition-colors duration-150',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    fullOnMobile && 'w-full md:w-auto',
  );
}

type Content = { children: ReactNode; arrow?: boolean };

function ButtonContent({ children, arrow }: Content) {
  return (
    <>
      {children}
      {arrow && <ArrowRightIcon />}
    </>
  );
}

type ButtonLinkProps = StyleOptions &
  Content &
  Omit<ComponentProps<typeof Link>, 'children'>;

export function ButtonLink({
  variant,
  size,
  fullOnMobile,
  arrow,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonClasses({ variant, size, fullOnMobile }), className)} {...props}>
      <ButtonContent arrow={arrow}>{children}</ButtonContent>
    </Link>
  );
}

type ButtonProps = StyleOptions & Content & Omit<ComponentProps<'button'>, 'children'>;

export function Button({
  variant,
  size,
  fullOnMobile,
  arrow,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonClasses({ variant, size, fullOnMobile }), className)}
      {...props}
    >
      <ButtonContent arrow={arrow}>{children}</ButtonContent>
    </button>
  );
}
