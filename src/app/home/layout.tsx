import Header from "@/components/layout/home/Header";
import Footer from "@/components/layout/home/Footer";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}
