import type { SVGProps } from 'react';

type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & { size?: number };

function StrokeIcon({
  size = 16,
  viewBox = '0 0 16 16',
  strokeWidth = 1.8,
  d,
  ...props
}: IconProps & { d: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={d} />
    </svg>
  );
}

export function ArrowRightIcon({ size = 16, ...props }: IconProps) {
  return <StrokeIcon size={size} viewBox="0 0 16 16" d="M2.5 8h11M9 3.5 13.5 8 9 12.5" {...props} />;
}

/** Arrow pointing up-right, for links that open elsewhere. */
export function ArrowUpRightIcon({ size = 14, ...props }: IconProps) {
  return <StrokeIcon size={size} viewBox="0 0 14 14" d="M4 10 10 4M5 4h5v5" {...props} />;
}

export function GitHubIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

// Menu, close, sun and moon paths copied from apps/motion/components/ui/icons.tsx.
export function MenuIcon({ size = 20, ...props }: IconProps) {
  return <StrokeIcon size={size} viewBox="0 0 20 20" d="M2 5h16M2 10h16M2 15h16" {...props} />;
}

export function CloseIcon({ size = 20, ...props }: IconProps) {
  return <StrokeIcon size={size} viewBox="0 0 20 20" d="M4 4l12 12M16 4L4 16" {...props} />;
}

export function SunIcon({ size = 20, ...props }: IconProps) {
  return (
    <StrokeIcon
      size={size}
      viewBox="0 0 20 20"
      d="M13.5 10a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM10 1.75v1.5M10 16.75v1.5M1.75 10h1.5M16.75 10h1.5M4.17 4.17l1.06 1.06M14.77 14.77l1.06 1.06M4.17 15.83l1.06-1.06M14.77 5.23l1.06-1.06"
      {...props}
    />
  );
}

export function MoonIcon({ size = 20, ...props }: IconProps) {
  return <StrokeIcon size={size} viewBox="0 0 20 20" d="M16.75 12.4A7 7 0 0 1 7.6 3.25a7 7 0 1 0 9.15 9.15Z" {...props} />;
}
