import type { ChildrenProps } from "@/types";

const Layout = ({ children }: ChildrenProps) => {
  return <div className="py-6">{children}</div>;
};

export default Layout;
