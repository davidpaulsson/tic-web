export function DocumentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 48 48" fill="none" {...props}>
      <path
        d="M41.5 40.5v-32a5 5 0 00-5-5h-17l-12 12v25a5 5 0 005 5h24a5 5 0 005-5z"
        stroke="#102030"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="square"
      />
      <path
        d="M19.5 4v-.5V11a4.5 4.5 0 01-4.5 4.5H7.5 8M14.5 24.5h20M34.5 16.5h-9M14.5 32.5h20"
        stroke="#102030"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="square"
      />
    </svg>
  );
}
