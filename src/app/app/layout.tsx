import Command from "@/components/app/layout/Command";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Command />
      {children}
    </main>
  );
}
