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

export function ArrowRightIcon({ size = 18, ...props }: IconProps) {
  return <StrokeIcon size={size} viewBox="0 0 18 18" d="M3 9h12M10 4l5 5-5 5" {...props} />;
}

export function ArrowLeftIcon({ size = 18, ...props }: IconProps) {
  return <StrokeIcon size={size} viewBox="0 0 18 18" d="M15 9H3M8 4L3 9l5 5" {...props} />;
}

/** Small "back" arrow used by breadcrumb links. */
export function BackIcon({ size = 16, ...props }: IconProps) {
  return <StrokeIcon size={size} d="M13 8H3M7 3L2 8l5 5" {...props} />;
}

export function CheckIcon({ size = 16, ...props }: IconProps) {
  return <StrokeIcon size={size} d="M3 8.5l3.2 3.2L13 4.8" {...props} />;
}

export function CrossIcon({ size = 16, ...props }: IconProps) {
  return <StrokeIcon size={size} d="M4 4l8 8M12 4l-8 8" {...props} />;
}

export function MenuIcon({ size = 20, ...props }: IconProps) {
  return <StrokeIcon size={size} viewBox="0 0 20 20" d="M2 5h16M2 10h16M2 15h16" {...props} />;
}

export function CloseIcon({ size = 20, ...props }: IconProps) {
  return <StrokeIcon size={size} viewBox="0 0 20 20" d="M4 4l12 12M16 4L4 16" {...props} />;
}

export function LogoMark({ size = 30, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <rect x="3" y="3" width="24" height="24" rx="5" />
      <path d="M11 19l8-8M12.5 11H19v6.5" />
    </svg>
  );
}

export function QuoteMark({ width = 30, height = 24, ...props }: Omit<IconProps, 'size'>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M0 24V13.5C0 6 4 1.5 11 0l1.5 3.4C8.6 4.6 7 7 6.8 10H12v14H0zm17 0V13.5C17 6 21 1.5 28 0l1.5 3.4C25.6 4.6 24 7 23.8 10H29v14H17z" />
    </svg>
  );
}
