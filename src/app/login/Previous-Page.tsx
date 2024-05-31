"use client";

import { useRouter } from "next/navigation";

import IconBack from "../../../public/Back.Icon";
import { Button } from "@/components/ui/button";

const PreviousPageBtn = ({ isLoading }: { isLoading: boolean }) => {
  const router = useRouter();
  const previousPage = () => router.back();

  return (
    <Button
      disabled={isLoading}
      onClick={previousPage}
      variant={"gradient"}
      className="group w-full sm:w-[350px] gap-8 flex ">
      Voltar{""}
      <IconBack className="group-hover:animate-pulse h-4 w-4" />
    </Button>
  );
};

export default PreviousPageBtn;
