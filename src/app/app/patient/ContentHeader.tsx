import { ActivityLogIcon, CalendarIcon } from "@radix-ui/react-icons";
import cn from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";

const ContentHeader = () => {
  return (
    <div className="w-full px-6 pb-4 flex gap-3">
      <Button
        variant={"gradientOutline"}
        className="md:px-6 flex gap-3 items-center md:max-w-[120px] md:w-full text-xs">
        <ActivityLogIcon />
        <p className="md:block hidden"> Filtros</p>
      </Button>
    </div>
  );
};

export default ContentHeader;
