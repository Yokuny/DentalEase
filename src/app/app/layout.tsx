import Command from "@/components/app/layout/WorkSpace";
import Footer from "@/components/app/layout/Footer";
import { Card } from "@/components/ui/card";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Command />
      <div className="md:py-10 gap-10 max-w-screen-2xl md:container min-h-screen flex flex-col items-center justify-between">
        <Card className="w-full">{children}</Card>
      </div>
      <Footer />
    </main>
  );
}
