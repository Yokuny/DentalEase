import Header from "@/components/header/header";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Header />
      <div className="mt-20">{children}</div>
    </main>
  );
}
