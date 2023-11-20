"use client";
import { createContext, useContext, useState } from "react";
import type { ContextProps, ChildrenProps } from "@/types";

const GlobalContext = createContext<ContextProps>({
  user: "",
  setUser: () => {},
});

export const GlobalProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState("" as string | null);

  return <GlobalContext.Provider value={{ user, setUser }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => useContext(GlobalContext);
