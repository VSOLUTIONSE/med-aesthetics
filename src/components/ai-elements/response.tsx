"use client";

import { cn } from "@/lib/utils";
import { type ComponentProps, memo, useMemo } from "react";
import { Streamdown } from "streamdown";

type ResponseProps = ComponentProps<typeof Streamdown>;

export const Response = memo(
  ({ className, ...props }: ResponseProps) => {
    const origin = useMemo(() => {
      if (typeof window !== "undefined") return window.location.origin;
      return "";
    }, []);

    return (
      <Streamdown
        className={cn(
          "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
          className
        )}
        allowedLinkPrefixes={["*"]}
        defaultOrigin={origin}
        {...props}
      />
    );
  },
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

Response.displayName = "Response";
