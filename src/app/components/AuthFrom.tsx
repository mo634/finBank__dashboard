"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInputField from "./CustomInputField"
import { formSchema } from "@/lib/utils"
const AuthFrom = () => {

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    <CustomInputField
                    control={form.control} 
                    name="email"
                    placeholder="Enter You Email"
                    />

                    <CustomInputField
                    control={form.control} 
                    name="password"
                    placeholder="Enter You password"
                    />


                    <Button type="submit" className="w-full bg-bankGradient">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default AuthFrom