export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  src: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
  href?: string;
}
