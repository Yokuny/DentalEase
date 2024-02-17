"use client";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DatePickerDemo from "@/components/ui/date-picker";
import { POST } from "@/lib/fetchConfig";
import Image from "next/image";

const HomePage = () => {
  const API = process.env.NEXT_PUBLIC_API;

  const handles = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("teste");

    const body = {
      email: "aaa@asd.com",
      password: "asdASD123",
    };
    console.log(POST(body));

    try {
      const userAceess = await fetch(`${API}clinic/create`, POST(body));

      const user = await userAceess.json();
      console.log("Rss", user);
    } catch (Error: any) {
      console.log("Erro no login", Error.message);
    }
  };

  return (
    <>
      <CardHeader className="flex flex-row justify-between">
        <button onClick={handles}>Teste</button>
        <div className="flex flex-col gap-1">
          <CardTitle className="text-blue400">Agenda</CardTitle>
          <CardDescription>Horarios agendados</CardDescription>
        </div>
        <div>
          <DatePickerDemo />
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-center flex-col bg-slate-500">
        <p>Card Content</p>
        <Image src="/agenda.webp" alt="Bookshelves" width={500} height={500} className="w-full" />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </>
  );
};

export default HomePage;
