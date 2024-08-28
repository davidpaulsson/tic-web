import { unstable_flag as flag } from '@vercel/flags/next';

export const showNewWeb = flag({
  key: 'new-web',
  decide: () => false,
});
