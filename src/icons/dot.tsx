import { cn } from '@/lib/utils';

export function Dot(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 2 2" width={2} height={2} aria-hidden="true" {...props}>
      <circle cx={1} cy={1} r={1} fill="currentColor" />
    </svg>
  );
}
