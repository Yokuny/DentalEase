import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import cn from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        gradient:
          "bg-gradient-to-r from-blue400 hover:from-blue500 to-blue600 hover:to-blue700 dark:text-white shadow-sm",
        solid500: "bg-blue500 text-white hover:bg-blue600 dark:bg-blue400 dark:hover:bg-blue500 shadow-sm",
        solid600: "bg-blue600 text-white hover:bg-blue700 dark:bg-blue500 dark:hover:bg-blue600 shadow-sm",
        solid700:
          "bg-gradient-to-r from-blue600 hover:from-blue700 to-blue800 hover:to-blue900 dark:text-white shadow-sm",
        outline:
          "border-blue700 dark:border-blue700 bg-transparent2 hover:bg-blue50 dark:bg-slate-950 dark:hover:bg-slate-900 text-blue800 hover:text-blue800 dark:text-blue400 shadow-sm border",

        secondary:
          "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        ghost:
          "bg-gradient-to-r from-blue100 to-blue300 shadow-sm hover:saturate-150 text-blue800 dark:text-blue950",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
