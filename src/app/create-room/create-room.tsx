"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { create } from "domain";
import { useRouter } from "next/navigation";
import { createRoomAction } from "./actions";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(1000),
  language: z.string().min(1).max(50),
  githubRepo: z.string().min(1).max(1000),
});

export default function CreateRoomPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      language: "",
      githubRepo: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    //Invoke a server action and store the data on the database
    await createRoomAction(values);
    router.push("/");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Public Room Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Code Fiesta" />
              </FormControl>
              <FormDescription>This is your public room name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="A github custom card generator using GitHub API "
                />
              </FormControl>
              <FormDescription>
                Tell us in which coding language you are using.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input {...field} placeholder="react,typescript,tailwind" />
              </FormControl>
              <FormDescription>
                Your project includes which programming language.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Repo Link</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://github.com/techfreakSahil"
                />
              </FormControl>
              <FormDescription>Your project github repo link</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
