import type { Intraoral } from "@/types";

type ReactNode = {
  children: React.ReactNode;
};

const Title = ({ children }: ReactNode) => <h3 className="text-sm tracking-wide text-muted-foreground">{children}</h3>;
const Content = ({ children }: ReactNode) => <p className="pl-2 text-sm">{children}</p>;

const IntraoralRender = ({ intraoral }: { intraoral: Intraoral }) => {
  return (
    <div className="w-full max-w-md gap-20 flex">
      <div className="w-auto gap-1 flex-col flex">
        <h3 className="mb-2 text-sm font-medium tracking-wide text-muted-foreground">Avaliação da saúde bucal</h3>
        {intraoral.hygiene && (
          <div className="w-auto gap-1 flex-col flex">
            <Title>Higiene:</Title>
            <Content>{intraoral.hygiene}</Content>
          </div>
        )}
        {intraoral.halitosis && (
          <div className="w-auto gap-1 flex-col flex">
            <Title>Mau hálito:</Title>
            <Content>{intraoral.halitosis}</Content>
          </div>
        )}
        {intraoral.tartar && (
          <div className="w-auto gap-1 flex-col flex">
            <Title>Tártaro:</Title>
            <Content>{intraoral.tartar}</Content>
          </div>
        )}
        {intraoral.gums && (
          <div className="w-auto gap-1 flex-col flex">
            <Title>Gengivas:</Title>
            <Content>{intraoral.gums}</Content>
          </div>
        )}
        {intraoral.mucosa && (
          <div className="w-auto gap-1 flex-col flex">
            <Title>Mucosa:</Title>
            <Content>{intraoral.mucosa}</Content>
          </div>
        )}
      </div>

      <div className="w-auto gap-1 flex-col flex">
        <h3 className="mb-2 text-sm font-medium tracking-wide text-muted-foreground">Partes da boca</h3>
        {intraoral.oralFloor && (
          <div className="w-auto gap-1 flex-col flex">
            <Title>Assoalho bucal:</Title>
            <Content>{intraoral.oralFloor}</Content>
          </div>
        )}
        {intraoral.palate && (
          <div className="w-auto gap-1 flex-col flex">
            <Title>Céu da boca:</Title>
            <Content>{intraoral.palate}</Content>
          </div>
        )}
        {intraoral.tongue && (
          <div className="w-auto gap-1 flex-col flex">
            <Title>Língua:</Title>
            <Content>{intraoral.tongue}</Content>
          </div>
        )}
        {intraoral.lips && (
          <div className="w-auto gap-1 flex-col flex">
            <Title>Lábios:</Title>
            <Content>{intraoral.lips}</Content>
          </div>
        )}
        {intraoral.otherObservations && (
          <div className="w-auto gap-1 flex-col flex">
            <Title>Outras observações:</Title>
            <Content>{intraoral.otherObservations}</Content>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntraoralRender;
