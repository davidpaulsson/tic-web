import * as React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 114 38" {...props}>
      <path
        fill="currentColor"
        d="M48.75 37.067h9.669V6.007h-9.67v31.06zm31.027-4.249V10.256h33.331V6.008H70.107v31.06h43.074v-4.25zM9.67 0H0v37.068h38.55v-4.25H9.67V10.256h28.88V6.008H9.67z"
      />
    </svg>
  );
}
