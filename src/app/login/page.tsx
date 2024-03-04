import { Metadata } from "next";

import Banner from "./Banner";
import Auth from "./Auth";

export const metadata: Metadata = {
  title: "Autenticação",
  description: "Página de cadastro e autenticação de usuário.",
};

const AuthenticationPage = () => {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Banner />
      <Auth />
    </div>
  );
};

export default AuthenticationPage;
