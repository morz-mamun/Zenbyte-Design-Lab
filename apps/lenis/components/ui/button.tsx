import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

import { RollLabel } from '@/components/motion/roll-label';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from './icons';

/**
 * `primary`: accent pill. `secondary`: outlined pill. `inverted`: dark pill for
 * accent bands. `secondary-on-dark` is kept as an alias of `secondary`.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'inverted' | 'secondary-on-dark';
export type ButtonSize = 'default' | 'nav';

type StyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Full width below `md`. Defaults to true. */
  fullOnMobile?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-on-accent border-accent hover:bg-accent-hover hover:border-accent-hover',
  secondary: 'bg-transparent text-fg border-line hover:border-fg',
  'secondary-on-dark': 'bg-transparent text-fg border-line hover:border-fg',
  inverted: 'bg-bg text-fg border-bg hover:bg-surface',
};

const sizes: Record<ButtonSize, string> = {
  default: 'h-[52px] px-6 text-[13px] xl:h-14 xl:px-7 xl:text-sm',
  nav: 'h-11 px-5 text-[13px]',
};

export function buttonClasses({
  variant = 'primary',
  size = 'default',
  fullOnMobile = true,
}: StyleOptions = {}) {
  return cn(
    'group inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full border',
    'font-sans leading-none font-medium tracking-[0.04em] whitespace-nowrap uppercase',
    'transition-[background-color,border-color,color] duration-300',
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
      <RollLabel>{children}</RollLabel>
      {arrow && (
        <ArrowRightIcon
          size={16}
          className="transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
        />
      )}
    </>
  );
}

type ButtonLinkProps = StyleOptions & Content & Omit<ComponentProps<typeof Link>, 'children'>;

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

type ArrowLinkProps = Omit<ComponentProps<typeof Link>, 'children'> & {
  children: ReactNode;
  tone?: 'accent' | 'fg';
};

/** Uppercase text link with a rolling label and an arrow that nudges right. */
export function ArrowLink({ children, tone = 'accent', className, ...props }: ArrowLinkProps) {
  return (
    <Link
      className={cn(
        'group inline-flex w-fit items-center gap-2 text-[13px] leading-none font-medium tracking-[0.04em] uppercase xl:text-sm',
        tone === 'accent' ? 'text-accent-text' : 'text-fg',
        className,
      )}
      {...props}
    >
      <RollLabel>{children}</RollLabel>
      <ArrowRightIcon
        size={16}
        className="transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
      />
    </Link>
  );
}
