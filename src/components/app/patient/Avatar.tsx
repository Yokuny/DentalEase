"use client";

import { useState } from "react";
import { PUT, request } from "@/helpers/fetch.config";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/helpers/cn.util";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type PatientAvatarProps = {
  image: string | null | undefined;
  patientID: string | null;
  fallback: string;
};

const PatientAvatar = ({ image, patientID, fallback }: PatientAvatarProps) => {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = async (e: any) => {
    e.preventDefault();
    if (!patientID) return;
    if (!img || img === "") return;
    const body = { image: img };

    try {
      const res = await request(`patient/${patientID}/image`, PUT(body));
      if (res.success === false) throw new Error(res.message);

      toast({ title: "Sucesso", description: "Imagem alterada com sucesso, atualize a pagina" });
      setOpen(false);
    } catch (Error: any) {
      toast({ title: "Erro", description: Error.message }); // receber o toast
    } finally {
      setIsLoading(false);
    }
  };

  const checkImage = (e: any) => {
    if (e.target.value === "") return;
    setIsLoading(true);
    const img = new Image();
    img.src = e.target.value;
    img.onload = () => {
      setIsLoading(false);
      setImg(e.target.value);
      toast({ title: "Sucesso", description: "URL válida" });
    };
    img.onerror = () => {
      setIsLoading(false);
      setImg("");
      toast({ title: "Erro", description: "URL inválida" });
    };
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-12 h-12 cursor-pointer">
        <Avatar className="group relative justify-center items-center flex">
          <div className="w-full h-full group-hover:absolute hidden bg-white/70 dark:bg-slate-950/60 justify-center items-center group-hover:flex">
            <p className="text-sm font-bold dark:text-skyBlue text-primaryBlue">Editar</p>
          </div>
          <AvatarImage src={image || ""} alt="user image" className="rounded-full" />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <div className="mx-auto gap-8 flex-col flex">
          <DialogHeader>
            <DialogTitle>Alterar foto</DialogTitle>
            <DialogDescription>Insira a URL da imagem para ficha do paciente</DialogDescription>
          </DialogHeader>
          <form className="gap-6 flex-col flex" onSubmit={handleImageChange}>
            <Input
              placeholder="URL da imagem"
              className={cn("bg-white dark:bg-slate-950/50 border-b-2", img ? "border-b-skyBlue" : "border-b-red-500")}
              disabled={isLoading}
              onChange={checkImage}
            />
            <DialogFooter>
              <Button onClick={() => setOpen(false)} className="w-32" variant={"blank"} disabled={isLoading}>
                Cancelar
              </Button>
              <Button type="submit" className="w-32" disabled={isLoading}>
                Alterar
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientAvatar;
