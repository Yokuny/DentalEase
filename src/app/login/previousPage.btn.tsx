"use client";

import { cn } from "@/helpers/cn.util";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "@/components/ui/button";

const PreviousPageBtn = () => {
  const previousPage = () => window.history.back();

  return (
    <Button
      onClick={previousPage}
      className={cn(buttonVariants({ variant: "outline" }), "border border-b-2 w-full flex sm:w-[350px]")}
      type="button">
      <ArrowLeftIcon className="mr-2 h-4 w-4" /> Voltar
    </Button>
  );
};

export default PreviousPageBtn;
