export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Dental Ease",
  description: "Dental Ease - Gerenciamento de consultórios odontológicos",
  navItems: [
    { label: "Inicio", href: "/" },
    { label: "Serviços", href: "/login" },
    { label: "Quem somos", href: "/about" },
    { label: "Contato", href: "/contact" },
  ],

  privatePages: [
    { label: "App", href: "/app" },
    { label: "Dados", href: "/app/dashboard" },
    { label: "Registro", href: "/app/register" },
    { label: "Perfil", href: "/app/user" },
    { label: "Paciente", href: "/app/patient" },
  ],
};
