"use client"
import {
  useState
} from "react"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

const formSchema = z.object({
  name_2302177418: z.string(),
  name_6890311324: z.string()
});

export default function MyForm({ initialData, mode = "add" }: { initialData?: any; mode?: "add" | "update" }) {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name_2302177418: initialData?.name_2302177418 || "",
        name_6890311324: initialData?.name_6890311324 || "",
      },
    });
  
    function onSubmit(values: z.infer<typeof formSchema>) {
      if (mode === "add") {
        console.log("Adding:", values);
        toast.success("Record added successfully!");
      } else if (mode === "update") {
        console.log("Updating:", values);
        toast.success("Record updated successfully!");
      }
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
          <FormField
            control={form.control}
            name="name_2302177418"
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
          <FormField
            control={form.control}
            name="name_6890311324"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>You can manage email addresses in your email settings.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{mode === "add" ? "Add" : "Update"}</Button>
        </form>
      </Form>
    );
  }
  