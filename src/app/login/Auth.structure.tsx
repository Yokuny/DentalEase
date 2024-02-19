"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import cn from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import PreviousPageBtn from "./PreviousPage.btn";
import SignUp from "./SignUp.structure";
import SignIn from "./SignIn.structure";

const loginParamValues = ["entrar", "cadastrar"];

const AuthStructure = () => {
  const searchParams = useSearchParams();
  const loginParam = searchParams.get("acess");

  const { toast } = useToast();

  const handleRequestError = (title: string, message: string) =>
    toast({ title: title, description: message });

  return (
    <>
      <Link
        href={{ search: `?acess=${loginParamValues.find((value) => value !== loginParam) || "entrar"}` }}
        className={cn(
          buttonVariants({ variant: "gradientS" }),
          "absolute right-6 top-6 md:right-10 md:top-10 w-28 text-white font-semibold"
        )}>
        {loginParam === "entrar" ? "Cadastrar" : "Entrar"}
      </Link>
      <div className="lg:p-8 mb-10 flex flex-col h-full justify-between">
        <div className="flex justify-center">
          {loginParam === "entrar" ? (
            <SignIn handleRequestError={handleRequestError} />
          ) : (
            <SignUp handleRequestError={handleRequestError} />
          )}
        </div>
        <div className="w-full flex justify-center">
          <PreviousPageBtn />
        </div>
      </div>
    </>
  );
};

export default AuthStructure;
