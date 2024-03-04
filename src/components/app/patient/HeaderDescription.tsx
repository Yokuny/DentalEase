import { CardDescription, CardTitle } from "@/components/ui/card";

const HeaderDescription = () => {
  return (
    <div className="md:gap-2 md:flex-row md:items-baseline flex flex-col">
      <CardTitle className="text-blue400">Pacientes</CardTitle>
      <CardDescription className="md:block hidden">
        Cadastros, consultas, históricos, em um só lugar.
      </CardDescription>
    </div>
  );
};

export default HeaderDescription;
