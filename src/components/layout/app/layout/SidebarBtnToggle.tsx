import { CaretLeftIcon } from "@radix-ui/react-icons";
import { cn } from "@/helpers/cn.util";

import { Button } from "@/components/ui/button";

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

const SidebarBtnToggle = ({ isOpen, setIsOpen }: SidebarToggleProps) => {
  return (
    <div className="absolute z-[100] top-[15px] -right-[16px] invisible lg:visible">
      <Button
        onClick={() => setIsOpen?.()}
        className="rounded-md w-10 h-8 border shadow-sm"
        variant="primary"
        size="icon">
        <CaretLeftIcon
          className={cn(
            "h-3 w-3 transition-transform ease-in-out duration-700 stroke-slate-900 dark:stroke-slate-100",
            isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
};

export default SidebarBtnToggle;
