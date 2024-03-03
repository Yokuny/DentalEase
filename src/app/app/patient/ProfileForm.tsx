"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { birthRegExp, numClean } from "@/helpers";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const lengthMessage = (min: number, max: number) => ({
  message: `O campo deve ter ${min ? `${min} a ${max} caracteres.` : `no máximo ${max} caracteres`}`,
});

export const mailMessage = () => ({
  message: `O campo deve ser um email válido`,
});

const formSchema = z.object({
  name: z.string().trim().min(5, lengthMessage(5, 30)).max(30, lengthMessage(5, 30)),
  email: z.string().trim().email(mailMessage()).min(5, lengthMessage(5, 50)).max(50, lengthMessage(5, 50)),
  cpf: z.string().trim().min(11, lengthMessage(11, 11)).max(11, lengthMessage(11, 11)).transform(numClean),
  rg: z.string().trim().min(7, lengthMessage(7, 7)).max(7, lengthMessage(7, 7)).transform(numClean),
  birthdate: z.string().trim().regex(birthRegExp),
  sex: z.enum(["M", "F"]),
  phone: z.string().trim().min(11, lengthMessage(11, 11)).max(11, lengthMessage(11, 11)).transform(numClean),
  cep: z.string().trim().min(8, lengthMessage(8, 8)).max(8, lengthMessage(8, 8)).transform(numClean),
  address: z.string().trim().min(5, lengthMessage(5, 50)).max(50, lengthMessage(5, 50)),
});

const ProfileForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
