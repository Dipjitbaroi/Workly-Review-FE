import { cn } from "@/lib/utils";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { ReactNode } from "react";

export const MyLinkButton = ({
  children,
  href,
  target,
  className,
}: {
  children: ReactNode;
  href: Url;
  target?: string;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "block w-fit py-2 px-4 bg-primary-500 text-white rounded-md text-sm hover:bg-primary-500/80",
        className
      )}
      target={target}
    >
      {children}
    </Link>
  );
};
