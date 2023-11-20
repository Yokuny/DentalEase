import { ChildrenProps } from "@/types";

const Layout = ({ children }: ChildrenProps) => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="max-w-lg gap-8 md:pt-20 justify-center items-center flex-col flex">{children}</div>
    </section>
  );
};
export default Layout;
