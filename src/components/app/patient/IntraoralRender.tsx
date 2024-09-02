import type { Intraoral } from "@/types";
import { capitalizeString } from "@/helpers/formatter.helper";
import { ScrollArea } from "@/components/ui/scroll-area";

type ReactNode = {
  children: React.ReactNode;
};

const Title = ({ children }: ReactNode) => <h3 className="text-sm tracking-wide text-muted-foreground">{children}</h3>;
const Content = ({ children }: ReactNode) => <p className="pl-2 text-sm">{children}</p>;

const IntraoralRender = ({ intraoral }: { intraoral: Intraoral }) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="gap-2 w-auto h-[500px] flex-wrap flex-row flex">
        <div className="max-w-md w-full gap-2 flex-col flex">
          <div className="w-full h-fit p-3 pr-5 gap-2 border rounded-sm bg-white dark:bg-slate-950 flex-col flex">
            <h3 className="mb-2 text-sm font-medium tracking-wide text-muted-foreground">Partes da boca</h3>
            {intraoral.oralFloor && (
              <div className="gap-1 p-2 flex-col flex">
                <Title>Assoalho bucal:</Title>
                <Content>{capitalizeString(intraoral.oralFloor)}</Content>
              </div>
            )}
            {intraoral.palate && (
              <div className="gap-1 p-2 flex-col flex">
                <Title>Céu da boca:</Title>
                <Content>{capitalizeString(intraoral.palate)}</Content>
              </div>
            )}
            {intraoral.tongue && (
              <div className="gap-1 p-2 flex-col flex">
                <Title>Língua:</Title>
                <Content>{capitalizeString(intraoral.tongue)}</Content>
              </div>
            )}
            {intraoral.lips && (
              <div className="gap-1 p-2 flex-col flex">
                <Title>Lábios:</Title>
                <Content>{capitalizeString(intraoral.lips)}</Content>
              </div>
            )}
            {intraoral.otherObservations && (
              <div className="gap-1 p-2 mb-2 border rounded-sm flex-col flex">
                <Title>Outras observações:</Title>
                <Content>{capitalizeString(intraoral.otherObservations)}</Content>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-md w-full gap-2 flex-col flex">
          <div className="w-full h-fit p-3 pr-5 gap-2 border rounded-sm bg-white dark:bg-slate-950 flex-col flex">
            <h3 className="mb-2 text-sm font-medium tracking-wide text-muted-foreground">Avaliação da saúde bucal</h3>
            {intraoral.hygiene && (
              <div className="gap-1 p-2 flex-col flex">
                <Title>Higiene:</Title>
                <Content>{capitalizeString(intraoral.hygiene)}</Content>
              </div>
            )}
            {intraoral.halitosis && (
              <div className="gap-1 p-2 flex-col flex">
                <Title>Mau hálito:</Title>
                <Content>{capitalizeString(intraoral.halitosis)}</Content>
              </div>
            )}
            {intraoral.tartar && (
              <div className="gap-1 p-2 flex-col flex">
                <Title>Tártaro:</Title>
                <Content>{capitalizeString(intraoral.tartar)}</Content>
              </div>
            )}
            {intraoral.gums && (
              <div className="gap-1 p-2 flex-col flex">
                <Title>Gengivas:</Title>
                <Content>{capitalizeString(intraoral.gums)}</Content>
              </div>
            )}
            {intraoral.mucosa && (
              <div className="gap-1 p-2 flex-col flex">
                <Title>Mucosa:</Title>
                <Content>{capitalizeString(intraoral.mucosa)}</Content>
              </div>
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default IntraoralRender;
