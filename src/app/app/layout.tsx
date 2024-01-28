export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>asd</h1>
      {children}
    </main>
  );
}
