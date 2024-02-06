import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DatePickerDemo from "@/components/ui/date-picker";
import Image from "next/image";

const HomePage = () => {
  return (
    <>
      <CardHeader className="flex flex-row justify-between">
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
