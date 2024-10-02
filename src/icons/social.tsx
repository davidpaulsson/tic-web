export function SocialIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M18.333 2.5L6.25 11.146v6.77l4.167-3.645" stroke="#fff" strokeWidth={1.5} strokeMiterlimit={10} />
      <path d="M2.5 8.333L18.333 2.5l-2.5 15.833-13.333-10z" stroke="#fff" strokeWidth={1.5} strokeMiterlimit={10} strokeLinecap="square" />
    </svg>
  );
}
