type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  const size = `h-12 w-auto sm:h-16 ${className}`;

  return (
    <img
      src="/images/logo-dark.png"
      alt="Collectif Humaniterre"
      className={size}
    />
  );
}
