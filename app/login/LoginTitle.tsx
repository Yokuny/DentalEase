import { title, subtitle } from "@/components/primitives";

const LoginTitle = () => {
  return (
    <div className="inline-block md:max-w-sm max-w-xs text-center justify-center">
      <h1 className={title()}>
        Gerencie suas <span className={title({ color: "blue" })}>corridas</span>.
      </h1>
      <h2 className={`${subtitle({ class: "mt-4" })} flex justify-center`}>
        <p className="md:w-2/3 w-10/12">Tenha acesso à seu app de gestão de transporte</p>
      </h2>
    </div>
  );
};

export default LoginTitle;
