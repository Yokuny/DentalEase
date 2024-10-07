import { useStore } from "@/hooks/use-store";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { cn } from "@/helpers/cn.util";

import DentalEaseLogo from "../../../ui/DentalEaseLogo";
import SidebarBtnToggle from "./SidebarBtnToggle";
import Menu from "./Menu";

const Sidebar = () => {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  return (
    <aside
      className={cn(
        "-translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 fixed z-50 top-0 left-0 h-screen",
        sidebar?.isOpen === false ? "w-[80px]" : "w-64"
      )}>
      <SidebarBtnToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="absolute z-0 bg-white dark:bg-slate-950 mt-16 border-r w-full h-full"></div>
      <div
        className={cn(
          "relative z-50 h-full flex-col px-4 py-3 overflow-y-auto transition-colors duration-700 flex",
          sidebar?.isOpen && "bg-white dark:bg-slate-950 shadow-lg"
        )}>
        <div className="justify-center flex h-6">
          <div
            className={cn(
              "transition-[transform,opacity,display] ease-in-out duration-300",
              sidebar?.isOpen === false ? "-translate-x-96 opacity-0 hidden" : "translate-x-0 opacity-100"
            )}>
            <DentalEaseLogo />
          </div>
        </div>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
};

export default Sidebar;
