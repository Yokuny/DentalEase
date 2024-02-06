import Command from "@/components/app/layout/WorkSpace";
import Footer from "@/components/app/layout/Footer";
import { Card } from "@/components/ui/card";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="pt-10 gap-10 max-w-screen-2xl container min-h-screen flex flex-col items-center justify-between">
      <Command />
      <Card className="w-full">{children}</Card>
      <Footer />
    </main>
  );
}
