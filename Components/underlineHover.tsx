import { cn } from "@/lib/utils";
import React from "react";

const UnderlineHover = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "relative hover:text-secondary-foreground cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-0.5 after:bg-secondary-foreground after:scale-x-0 after:origin-right after:transition-transform after:duration-500 after:ease-in-out hover:after:scale-x-100 hover:after:origin-left",
        className
      )}
    >
      {children}
    </span>
  );
};

export default UnderlineHover;
