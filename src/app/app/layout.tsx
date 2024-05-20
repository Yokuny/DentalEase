"use client";

import WorkSpace from "@/components/layout/app/layout/WorkSpace";
import Sidebar from "@/components/layout/app/layout/Sidebar";
import Footer from "@/components/layout/app/layout/Footer";
import { Card } from "@/components/ui/card";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      <WorkSpace />
      <div className="md:py-10 mt-2 gap-10 max-w-screen-2xl md:container min-h-screen flex flex-col items-center justify-between">
        <Card className="w-full">{children}</Card>
      </div>
      <Sidebar />
      <Footer />
    </main>
  );
};

export default Layout;
