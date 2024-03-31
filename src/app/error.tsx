"use client";
import { useEffect } from "react";
import type { ErrorProps } from "@/types";

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {}, [error]);

  return (
    <div>
      <h2>Algo deu errado</h2>
      <button onClick={() => reset()}>Tente novamente</button>
    </div>
  );
}
