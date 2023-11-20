"use client";
import { FC } from "react";
import clsx from "clsx";
import { useIsSSR } from "@react-aria/ssr";
import type { ThemeSwitchProps } from "@/types";

import { useTheme } from "next-themes";
import { useSwitch } from "@nextui-org/switch";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className, classNames }) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch({
    isSelected: theme === "dark",
    "aria-label": `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-90 cursor-pointer",
          className,
          classNames?.base
        ),
      })}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper
          ),
        })}>
        {!isSelected || isSSR ? <SunFilledIcon /> : <MoonFilledIcon />}
      </div>
    </Component>
  );
};
