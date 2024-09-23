export function DeviationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 48 48" fill="none" {...props}>
      <path d="M27 22L40.823 8.179M27 13.5l9-9M35.5 22l9-9" stroke="#102030" strokeWidth={1.5} strokeMiterlimit={10} />
      <path
        d="M22 46.5c10.77 0 19.5-8.73 19.5-19.5H22V7.5C11.23 7.5 2.5 16.23 2.5 27S11.23 46.5 22 46.5z"
        stroke="#102030"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="square"
      />
      <path
        d="M46.5 22c0-10.77-8.73-19.5-19.5-19.5V22h19.5z"
        stroke="#102030"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="square"
      />
    </svg>
  );
}
