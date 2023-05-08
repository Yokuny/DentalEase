import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import LeftSidebar from "./LeftSidebar/index";
import TopNavbar from "./TopNavbar/index";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const Layout = ({ children }) => {
  const router = useRouter();

  const [active, setActive] = useState(false);

  const toogleActive = () => {
    setActive(!active);
  };

  return (
    <>
      <Head>
        <title>components/_app/Layout</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={`main-wrapper-content ${active && "active"}`}>
        {!(
          router.pathname === "/authentication/sign-in" ||
          router.pathname === "/authentication/sign-up" ||
          router.pathname === "/authentication/forgot-password" ||
          router.pathname === "/authentication/lock-screen" ||
          router.pathname === "/authentication/confirm-mail" ||
          router.pathname === "/authentication/logout"
        ) && (
          <>
            <TopNavbar toogleActive={toogleActive} />
            <LeftSidebar toogleActive={toogleActive} />
          </>
        )}

        <div className="main-content">
          {children}

          {!(
            router.pathname === "/authentication/sign-in" ||
            router.pathname === "/authentication/sign-up" ||
            router.pathname === "/authentication/forgot-password" ||
            router.pathname === "/authentication/lock-screen" ||
            router.pathname === "/authentication/confirm-mail" ||
            router.pathname === "/authentication/logout"
          ) && <Footer />}
        </div>
      </div>

      {/* ScrollToTop */}
      <ScrollToTop />
    </>
  );
};

export default Layout;
