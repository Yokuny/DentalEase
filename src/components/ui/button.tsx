import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/helpers/cn.util";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300 cursor-pointer",
  {
    variants: {
      variant: {
        destructive: "bg-red-500 hover:bg-red-600 text-white shadow-sm",
        success: "bg-green-500 hover:bg-green-600 text-white shadow-sm",
        info: "bg-blue-500 hover:bg-blue-600 text-white shadow-sm",
        warning: "bg-yellow-500 hover:bg-yellow-600 text-white shadow-sm",

        default: "bg-primaryBlue hover:bg-darkBlue saturate-150 font-semibold text-white shadow",
        defaultSolid: "bg-white dark:bg-slate-950 hover:bg-muted border font-semibold shadow-sm",
        basic:
          "bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100",

        blank: "!p-0",
        gradient:
          "bg-gradient-to-r from-primaryBlue bg-darkBlue saturate-150 hover:saturate-100 font-semibold text-white shadow-sm",
        primary:
          "bg-slate-50 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-950 dark:text-slate-200 hover:text-black hover:dark:text-white placeholder:text-black dark:placeholder:text-white border border-slate-200 dark:border-slate-700 shadow-xs data-[state=on]:bg-primaryBlue data-[state=on]:text-white data-[state=on]:border-transparent",
        secondary: "bg-skyBlue hover:saturate-150 font-semibold text-white shadow-sm",
        outline:
          "border-slate-400 bg-slate-50 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-700 hover:text-slate-900 dark:text-slate-300 shadow-sm border font-semibold placeholder:text-slate-700 dark:placeholder:text-slate-300 placeholder:font-normal",
        ghost:
          "bg-gradient-to-r from-skyBlue to-primaryBlue shadow-sm hover:saturate-150 text-darkBlue dark:text-blue950 font-semibold text-white",
        link: "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 underline-offset-4 hover:underline",
        glassy:
          "bg-white/20 hover:bg-white/30 text-slate-950 dark:text-white border border-white/30 hover:border-slate-200 shadow-sm backdrop-blur-sm",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        "icon-sm": "h-7 w-7",
        "icon-md": "md:h-10 md:w-10 h-8 w-7",
        "icon-lg": "h-12 w-12",
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
    return <Comp className={cn(buttonVariants({ variant, size, className }), "")} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
