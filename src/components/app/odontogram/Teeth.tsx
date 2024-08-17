import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Tooth from "./Tooth";

type ToothType = {
  number: number;
  faces: { [key: string]: boolean };
};

const Teeth = ({ controller }: { controller: any }) => {
  const permanentTeethNumbers = {
    top: [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],
    bottom: [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38],
  };

  const deciduousTeethNumbers = {
    top: [55, 54, 53, 52, 51, 61, 62, 63, 64, 65],
    bottom: [85, 84, 83, 82, 81, 71, 72, 73, 74, 75],
  };

  const toothFace = (toothNumber: number, face: string, selected: boolean) => {
    const handleToothFace = () => {
      const prev: ToothType[] = controller.value;
      const index = prev.findIndex((tooth: ToothType) => tooth.number === toothNumber);
      if (index === -1) {
        const newTooth = { number: toothNumber, faces: { [face]: selected } };
        prev.push(newTooth);
        return prev;
      }

      const newTooth = { number: toothNumber, faces: { ...prev[index].faces, [face]: selected } };
      prev[index] = newTooth;
      return prev;
    };

    controller.onChange(handleToothFace());
  };

  const cleanToothFace = () => {
    controller.onChange([]);
  };

  return (
    <div className="gap-2 flex-col flex">
      <Tabs
        defaultValue="permanentes"
        className="p-4 gap-4 bg-slate-50 dark:bg-slate-900/70 border rounded-lg flex-col flex">
        {["permanentes", "deciduos"].map((teeth) => (
          <TabsContent key={teeth} value={teeth}>
            <div className="py-6 gap-2 bg-white dark:bg-slate-950 items-center border rounded-lg flex-col flex">
              <div className="flex p-1">
                {teeth === "permanentes"
                  ? permanentTeethNumbers.top.map((toothNumber) => (
                      <Tooth key={toothNumber} number={toothNumber} handleFace={toothFace} bottom={false} />
                    ))
                  : deciduousTeethNumbers.top.map((toothNumber) => (
                      <Tooth key={toothNumber} number={toothNumber} handleFace={toothFace} bottom={false} />
                    ))}
              </div>
              <div className="flex p-1">
                {teeth === "permanentes"
                  ? permanentTeethNumbers.bottom.map((toothNumber) => (
                      <Tooth key={toothNumber} number={toothNumber} handleFace={toothFace} bottom={true} />
                    ))
                  : deciduousTeethNumbers.bottom.map((toothNumber) => (
                      <Tooth key={toothNumber} number={toothNumber} handleFace={toothFace} bottom={true} />
                    ))}
              </div>
            </div>
            <div className="flex items-center justify-center"></div>
          </TabsContent>
        ))}
        <div className="w-full justify-center flex">
          <TabsList className="grid w-fit h-auto grid-cols-2 border rounded-lg">
            <TabsTrigger value="permanentes" onClick={cleanToothFace}>
              Permanentes
            </TabsTrigger>
            <TabsTrigger value="deciduos" onClick={cleanToothFace}>
              Decíduos
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
};

export default Teeth;
