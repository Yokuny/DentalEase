import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { request, PUT } from "@/helpers/fetch.config";
import { refreshUser } from "@/helpers/dataManager.helper";
import { User, userSchema } from "@/schemas/user.schema";
import type { PartialUser } from "@/types";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ProfileFormProps = {
  user: PartialUser | null;
  toast: (title: string, message: string) => void;
};

const ProfileForm = ({ user, toast }: ProfileFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name,
      image: user?.image || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: User) => {
    setIsLoading(true);
    const body = {
      name: values.name,
      image: values.image,
    };

    try {
      const res = await request("user/update", PUT(body));
      if (res.success === false) throw new Error(res.message);
      toast("Sucesso", res.message);
      await refreshUser();
    } catch (error: any) {
      toast("Erro", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    form.setValue("name", user?.name || "");
    form.setValue("image", user?.image || "");
  }, [form, user]);

  return (
    <Form {...form}>
      <form
        id="user-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form.getValues());
        }}
        className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="gap-2 flex">
                <FormLabel>Nome</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Nome" {...field} disabled={isLoading} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="md:space-y-2 space-y-1">
          <FormLabel>Email</FormLabel>
          <Input disabled value={user?.email} />
        </div>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="gap-4 justify-between items-center flex">
              <Avatar className="h-14 w-14">
                <AvatarImage src={form.getValues("image")} alt="user image" className="rounded-full" />
                <AvatarFallback>img</AvatarFallback>
              </Avatar>
              <div className="w-full">
                <div className="gap-2 flex">
                  <FormLabel>Imagem de perfil</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="Imagem de perfil" {...field} disabled={isLoading} />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <Button form="user-form" type="submit" variant={"gradient"} disabled={isLoading}>
          Atualizar perfil
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
