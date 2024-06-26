import ThemeToggle from "@/components/theme/ThemeToggle";

const Footer = () => {
  return (
    <footer className="h-screen gap-6 bg-black/20 items-center justify-center flex flex-col">
      <p>This is the footer.</p>
      <ThemeToggle isOpen={false} />
    </footer>
  );
};

export default Footer;
