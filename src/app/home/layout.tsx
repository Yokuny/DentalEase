import Header from "@/components/home/header/Header";
import Footer from "@/components/home/footer/Footer";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}
