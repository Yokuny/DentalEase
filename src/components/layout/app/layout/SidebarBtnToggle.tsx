import { cn } from "@/helpers/cn.util";

import IconBack from "../../../../../public/Back.Icon";
import { Button } from "@/components/ui/button";

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

const SidebarBtnToggle = ({ isOpen, setIsOpen }: SidebarToggleProps) => {
  return (
    <div className="invisible lg:visible absolute z-[100] top-[15px] -right-[16px]">
      <Button
        onClick={() => setIsOpen?.()}
        className="rounded-md w-10 h-8 border shadow-sm"
        variant="primary"
        size="icon">
        <IconBack
          className={cn(
            "transition-transform ease-in-out duration-700 text-black dark:text-white",
            isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
};

export default SidebarBtnToggle;
