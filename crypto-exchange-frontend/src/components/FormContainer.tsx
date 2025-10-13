import React, { type ReactNode } from "react";

interface LogoProps {
  url: string;
  src: string;
  alt: string;
  title?: string;
}

interface FormContainerProps {
  heading?: string;
  children: ReactNode;
  logo?: LogoProps;
  footer?: ReactNode;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  heading,
  children,
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
    alt: "logo",
    title: "shadcnblocks.com",
  },
  footer,
}) => {
  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          <a href={logo.url}>
            <img src={logo.src} alt={logo.alt} title={logo.title} className="h-10 dark:invert" />
          </a>

          <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
            {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
            {children}
          </div>

          {footer && (
            <div className="text-muted-foreground flex justify-center gap-1 text-sm">{footer}</div>
          )}
        </div>
      </div>
    </section>
  );
};
