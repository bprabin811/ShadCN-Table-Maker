import { InstallationSteps } from "@/components/ui/installation-steps";

interface CodeDetailsProps {
  tableCode: string;
  columnCode: string;
  pageCode: string;
}

export default function CodeDetails({
  tableCode,
  columnCode,
  pageCode,
}: CodeDetailsProps) {
  const steps = [
    {
      title:
        "Copy and paste the form code from ShadCN-Form-Builder into your project.",
      description: "The code will be look like this initially.",
      code: `"use client"
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
  name_4603829743: z.string(),
  name_0878515932: z.number(),
  name_0706064476: z.string().optional(),
  name_6646786819: z.string()
});

export default function MyForm() {

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),

  })

  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        <div className="grid grid-cols-12 gap-4">
          
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          name="name_4603829743"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                placeholder="shadcn"
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          name="name_0878515932"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input 
                placeholder="shadcn"
                
                type="number"
                {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
        </div>
        
        <div className="grid grid-cols-12 gap-4">
          
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          name="name_0706064476"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
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
          </div>
          
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          name="name_6646786819"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                placeholder="shadcn"
                
                type="email"
                {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}`,
      language: "typescript",
      filename: "form.tsx",
    },
    {
      "title": "Align Import Paths with Project Structure and Update `form.tsx`",
      "description":
        "Ensure that the import paths align with your project's directory structure and naming conventions. Additionally, verify that all required packages are installed. Once these steps are completed, proceed to update the `form.tsx` file as outlined below.",
      "code": `
    // Update import paths
    import { MyFormData } from "@types/table";
    ...

    // update formSchema as per requirement add id as optional
    const formSchema = z.object({
      id: z.string().optional(),
      name_4603829743: z.string().min(2, { message: "Name must be at least 2 characters" }),
      name_0878515932: z.coerce.number().min(0, { message: "Age must be a positive number" }),
      name_0706064476: z.string().optional(),
      name_6646786819: z.string().email({ message: "Invalid email address" }),
    });

    // Add an interface for user form props
    interface MyFormProps {
      onSubmit: (data: MyFormData) => void;
      initialData?: MyFormData | null;
    }

    // Define the MyForm component with enhanced functionality
    export function MyForm({ onSubmit, initialData }: MyFormProps) {
    ...

    // Set default values for the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
        name_4603829743: "",
        name_0878515932: 0,
        name_0706064476: "",
        name_6646786819: "",
      },
    })

    //Add onSubmit on HandleSubmit function
    function handleSubmit(values: z.infer<typeof formSchema>) {
        try {
        onSubmit(values as MyFormData)
        form.reset()
        toast.success("User data submitted successfully!")
        } catch (error) {
        console.error("Form submission error", error)
        toast.error("Failed to submit the form. Please try again.")
        }
    }

    // update onsubmit in form
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 ...

    // Include a dynamic button for creating or updating user data
    <Button type="submit">{initialData ? "Update" : "Create"}</Button>
    `,
      language: "typescript",
      filename: "form.tsx",
    },
    {
      //add type component for form fields
      "title": "Define a TypeScript Interface for Form Data",
      "description": "Create a TypeScript interface to define the structure of form data, specifying field names and their respective data types for better type safety and maintainability.",
      code: `export interface MyFormData {
  id: string;
  name_4603829743: string;
  name_0878515932: number;
  name_0706064476: string;
  name_6646786819: string;
}`,
      language: "typescript",
      filename: "table.ts",
    },
    // create column component
    {
      "title": "Create a Column Component with React Table",
      "description": "Implement a column component using `@tanstack/react-table` to display and manage structured data. Leverage the `MyFormData` type to define column configurations, ensuring clarity and type safety.",
      code: `${columnCode}`,
      language: "typescript",
      filename: "column.tsx",
    },
    // create data-table component
    {
      "title": "Build a Data Table Component",
      "description": "Develop a data-table component to display structured data effectively. Integrate column definitions and data handling to create an interactive and user-friendly table.",
      code: `${tableCode}`,
      language: "typescript",
      filename: "data-table.tsx",
    },
    //create page.tsx
    {
      "title": "Develop a Page Component",
      "description": "Implement a page component that combines and renders the form and data-table components to create a cohesive user interface.",
      code: `${pageCode}`,
      laguage: "typescript",
      filename: "page.tsx",
    },
  ];

  return (
    <div className="container px-0 py-4">
      <InstallationSteps steps={steps} />
    </div>
  );
}
