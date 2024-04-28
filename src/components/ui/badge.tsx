import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/helpers/cn.util";

const badgeVariants = cva(
  "border-transparent inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:brightness-110",
  {
    variants: {
      variant: {
        positive: "bg-gradient-to-r from-green-400 to-green-500  text-white dark:text-black",
        neutral: "bg-gradient-to-r from-primaryBlue bg-darkBlue text-white dark:text-black",
        negative: "bg-gradient-to-r from-red-400 to-red-500 text-white dark:text-black",
        pink: "bg-gradient-to-r from-pink-400 to-pink-500 text-white dark:text-black",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
