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
import { useState } from "react"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { getLoggedInUser, signIn, signup } from "../../../lib/actions/user.action"
import { useRouter } from "next/navigation"
const AuthFrom = ({ type }: String) => {
    // states 
    const router = useRouter()
    const [isLoading, setIsloading] = useState(false)
    const autFormSchema = formSchema(type);
    const [user, setUser] = useState(null)



    // functions

    // 1. Define your form.
    const form = useForm<z.infer<typeof autFormSchema>>({
        resolver: zodResolver(autFormSchema),
        defaultValues: {
            email: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof autFormSchema>) => {
        setIsloading(true)
        try {

            if (type === "sign-up") {
                const newUser = await signup(values)
                setUser(newUser)
                console.log(newUser)
                setTimeout(() => {
                    router.push("/");
                }, 3000); // Wait for 3 seconds before redirecting
            }
            if (type === "sign-in") {
                console.log("sign in ")
                const response = await signIn({
                    email: values.email,
                    password: values.password
                })
                if (response) router.push("/")

            }


        } catch (error) {
            console.log(error)
        }
        finally {
            setIsloading(false)
        }
    }

    return (
        <div>
            {
                user
                    ? <h1 className=" text-green-600">SignUp Success</h1>
                    : <>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                {/* if signup form -> need to add more fields */}
                                {
                                    type === "sign-up" && (
                                        <>
                                            <div className=" flex gap-x-5">
                                                <CustomInputField
                                                    control={form.control}
                                                    name="firstName"
                                                    placeholder="Enter You First Name"
                                                />
                                                <CustomInputField
                                                    control={form.control}
                                                    name="lastName"
                                                    placeholder="Enter You Last Name"
                                                />
                                            </div>

                                            <CustomInputField
                                                control={form.control}
                                                name="address"
                                                placeholder="Enter You Specific Address"
                                            />

                                            <div className="flex gap-x-5">
                                                <CustomInputField
                                                    control={form.control}
                                                    name="state"
                                                    placeholder="ex:NY"
                                                />
                                                <CustomInputField
                                                    control={form.control}
                                                    name="postalCode"
                                                    placeholder="ex:11101"
                                                />
                                            </div>

                                            <div className="flex gap-x-5">

                                                <CustomInputField
                                                    control={form.control}
                                                    name="dateOfBirth"
                                                    placeholder="yyyy-mm-dd"
                                                />
                                                <CustomInputField
                                                    control={form.control}
                                                    name="ssn"
                                                    placeholder="SSN"
                                                />
                                            </div>
                                        </>
                                    )
                                }
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


                                <Button

                                    disabled={isLoading}
                                    type="submit" className="w-full  bg-bankGradient">
                                    {
                                        isLoading ? <>
                                            <Loader2 size={20} className="animate-spin" />
                                            {
                                                type === "sign-in" ? "log in" : "sign up"
                                            }
                                        </> : type === "sign-in" ? "log in" : "sign up"
                                    }
                                </Button>


                                {/*form  footer  */}

                                <p>{
                                    type === "sign-in" ? "Don't  " : "Already"
                                } have an account ?
                                    <Link
                                        className="text-bankGradient"
                                        href={
                                            type === "sign-in" ? "/sign-up" : "/sign-in"
                                        }>
                                        {
                                            type === "sign-in" ? "Sign up" : "Log in"
                                        }
                                    </Link>
                                </p>
                            </form>
                        </Form>
                    </>

            }
        </div>
    )
}

export default AuthFrom