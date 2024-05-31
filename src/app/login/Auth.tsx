"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/helpers/cn.util";

import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import PreviousPage from "./Previous-Page";
import SignUp from "./Sign-Up";
import SignIn from "./Sign-In";

const loginParamValues = ["login", "cadastro"];

const Auth = () => {
  const searchParams = useSearchParams();
  const loginParam = searchParams.get("interface");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const handlResponse = (title: string, message: string) => toast({ title: title, description: message });

  return (
    <>
      <Link
        href={
          isLoading
            ? "#"
            : { search: `?interface=${loginParamValues.find((value) => value !== loginParam) || "login"}` }
        }
        className={cn(buttonVariants({ variant: "gradient" }), "absolute right-6 top-6 md:right-10 md:top-10 w-28")}>
        {loginParam === "login" ? "Cadastrar" : "Entrar"}
      </Link>
      <div className="lg:p-8 mb-10 flex flex-col h-full justify-between">
        <div className="flex justify-center">
          {loginParam === "login" ? (
            <SignIn toast={handlResponse} isLoading={isLoading} setIsLoading={setIsLoading} />
          ) : (
            <SignUp toast={handlResponse} isLoading={isLoading} setIsLoading={setIsLoading} />
          )}
        </div>
        <div className="w-full flex justify-center">
          <PreviousPage isLoading={isLoading} />
        </div>
      </div>
    </>
  );
};

export default Auth;
