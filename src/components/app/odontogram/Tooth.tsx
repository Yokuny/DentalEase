import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import ToothParts from "../../../../public/odontogram/tooth_parts";
import ToothNumber from "./ToothNumber";

type faces = {
  facial: boolean;
  incisal: boolean;
  lingual: boolean;
  mesial: boolean;
  distal: boolean;
  occlusal: boolean;
  palatal: boolean;
};

type ToothProps = {
  number: number;
  handleFace: (toothNumber: number, face: string, selected: boolean) => void;
  bottom: boolean;
};

const Tooth = ({ number, handleFace, bottom }: ToothProps) => {
  const frontalTeeth = [11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43, 51, 52, 53, 61, 62, 63, 71, 72, 73, 81, 82, 83];
  const [faces, setFaces] = useState<faces>({
    facial: false,
    incisal: false,
    lingual: false,
    mesial: false,
    distal: false,
    occlusal: false,
    palatal: false,
  });
  const [selected, setSelected] = useState<boolean>(false);

  const faceHandler = (face: keyof faces) => {
    handleFace(number, face, !faces[face]);
    setFaces((prev) => ({ ...prev, [face]: !prev[face] }));
  };

  useEffect(() => {
    const faceValues = Object.values(faces);
    if (faceValues.includes(true)) {
      setSelected(true);
      return;
    }
    setSelected(false);
  }, [faces]);

  return (
    <div className={`h-auto gap-2 justify-end items-center flex ${bottom ? "flex-col-reverse" : "flex-col"}`}>
      <div className="relative">
        {selected && (
          //futuramente é possivel implementar qual parte do dente foi selecionada
          <div
            className={`absolute bg-skyBlue/50 rounded h-2 w-2 ${
              bottom ? "-top-0 -right-2" : "-bottom-0 -right-2"
            }`}></div>
        )}
        <ToothNumber toothNumber={number} />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"blank"} className="w-10">
            <ToothParts className="text-stone-500/70 dark:text-zinc-300/80" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" w-auto gap-2 flex-col flex">
          <div className="space-y-2">
            <p className="font-medium leading-none">{number}</p>
            <h4 className="text-sm leading-none text-muted-foreground">Face do dente:</h4>
          </div>

          {frontalTeeth.includes(number) ? (
            <>
              <Button
                onClick={() => faceHandler("facial")}
                className={`text-xs h-6 ${faces["facial"] && "bg-skyBlue text-white font-bold"}`}
                variant={"primary"}>
                Labial
              </Button>
              <Button
                onClick={() => faceHandler("incisal")}
                className={`text-xs h-6 ${faces["incisal"] && "bg-skyBlue text-white font-bold"}`}
                variant={"primary"}>
                Incisal
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => faceHandler("facial")}
                className={`text-xs h-6 ${faces["facial"] && "bg-skyBlue text-white font-bold"}`}
                variant={"primary"}>
                Vestibular
              </Button>
              <Button
                onClick={() => faceHandler("occlusal")}
                className={`text-xs h-6 ${faces["occlusal"] && "bg-skyBlue text-white font-bold"}`}
                variant={"primary"}>
                Occlusal
              </Button>
            </>
          )}

          {bottom ? (
            <Button
              onClick={() => faceHandler("lingual")}
              className={`text-xs h-6 ${faces["lingual"] && "bg-skyBlue text-white font-bold"}`}
              variant={"primary"}>
              Lingual
            </Button>
          ) : (
            <Button
              onClick={() => faceHandler("palatal")}
              className={`text-xs h-6 ${faces["palatal"] && "bg-skyBlue text-white font-bold"}`}
              variant={"primary"}>
              Palatal
            </Button>
          )}

          <Button
            onClick={() => faceHandler("mesial")}
            className={`text-xs h-6 ${faces["mesial"] && "bg-skyBlue text-white font-bold"}`}
            variant={"primary"}>
            Mesial
          </Button>
          <Button
            onClick={() => faceHandler("distal")}
            className={`text-xs h-6 ${faces["distal"] && "bg-skyBlue text-white font-bold"}`}
            variant={"primary"}>
            Distal
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Tooth;
