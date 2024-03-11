"use client";

import { useSearchParams } from "next/navigation";
import Anamnesis from "./Anamnesis";

const CloseView = () => {
  const searchParams = useSearchParams();
  const pageInterface = searchParams.get("interface");

  if (pageInterface === "anamnesis") {
    return <Anamnesis />;
  }

  return (
    <div>
      <h1>Patient Page</h1>
      <p>Dynamic ID: {}</p>
    </div>
  );
};

export default CloseView;
