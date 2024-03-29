"use client";

import { useSearchParams, redirect } from "next/navigation";
import Anamnesis from "./Anamnesis";
import Intraoral from "./Intraoral";

const CloseView = () => {
  const searchParams = useSearchParams();
  const pageInterface = searchParams.get("interface");

  if (pageInterface === "anamnese") {
    return <Anamnesis />;
  }

  if (pageInterface === "intraoral") {
    return <Intraoral />;
  }

  return redirect("/app/patient");
};

export default CloseView;