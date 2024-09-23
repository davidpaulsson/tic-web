import { CheckIcon } from '@/icons/check';

export const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="mb-3 flex gap-3 last:mb-0">
    <CheckIcon className="mt-1 inline h-4 w-4 flex-shrink-0 text-tic-purple" /> {children}
  </li>
);
