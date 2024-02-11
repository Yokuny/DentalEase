"use client";

import { useState } from "react";
import cn from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import PreviousPageBtn from "./previousPage.btn";
import SignUp from "./SignUp.structure";
import SignIn from "./SignIn.structure";

const AuthStructure = () => {
  const [registerPage, setRegisterPage] = useState(true);
  const { toast } = useToast();

  const handleRequestError = (title: string, message: string) =>
    toast({ title: title, description: message });

  return (
    <>
      <Button
        onClick={() => setRegisterPage((prev) => !prev)}
        className={cn(
          buttonVariants({ variant: "gradientS" }),
          "absolute right-6 top-6 md:right-10 md:top-10 w-28 text-white font-semibold"
        )}>
        {registerPage ? "Entrar" : "Cadastrar"}
      </Button>
      <div className="lg:p-8 mb-10 flex flex-col h-full justify-between">
        {registerPage ? <SignUp toast={handleRequestError} /> : <SignIn toast={handleRequestError} />}
        <div className="w-full flex justify-center">
          <PreviousPageBtn />
        </div>
      </div>
    </>
  );
};

export default AuthStructure;
