import Header from "@/components/header/Header";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}
