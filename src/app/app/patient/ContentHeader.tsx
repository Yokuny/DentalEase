import { ActivityLogIcon } from "@radix-ui/react-icons";
import cn from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ContentHeader = () => {
  return (
    <div className="w-full px-6 pb-4 flex gap-3">
      <Button variant={"gradientOutline"} className="px-6 flex gap-3 items-center max-w-[120px] w-full">
        <ActivityLogIcon /> filtros
      </Button>
      <Input
        placeholder="Digite para buscar"
        className={cn(buttonVariants({ variant: "outline" }), "max-w-[200px] w-full")}
      />
    </div>
  );
};

export default ContentHeader;
