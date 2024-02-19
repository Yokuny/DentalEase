import DentalEaseLogo from "@/components/dentalEase/DentalEaseLogo";
import NavMenu from "@/components/home/header/NavMenu";
import AcessBtns from "@/components/home/header/AcessBtns";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/10 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/20">
      <div className="max-w-screen-2xl md:container p-2 h-14 flex items-center">
        <div className="mr-4 md:flex gap-3">
          <DentalEaseLogo />
          <NavMenu />
        </div>
        <AcessBtns />
      </div>
    </header>
  );
};

export default Header;
