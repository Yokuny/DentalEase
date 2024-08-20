"use client";

import { useSearchParams, redirect } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";
import Patient from "./Patient";
import Anamnesis from "./Anamnesis";
import Intraoral from "./Intraoral";

const CloseView = () => {
  const searchParams = useSearchParams();
  const pageInterface = searchParams.get("interface");

  const { toast } = useToast();
  const handlRequestResponse = (title: string, message: string) => toast({ title: title, description: message });

  if (pageInterface === "patient") {
    return <Patient toast={handlRequestResponse} />;
  }

  if (pageInterface === "anamnese") {
    return <Anamnesis toast={handlRequestResponse} />;
  }

  if (pageInterface === "intraoral") {
    return <Intraoral toast={handlRequestResponse} />;
  }

  return redirect("/app/patient");
};

export default CloseView;