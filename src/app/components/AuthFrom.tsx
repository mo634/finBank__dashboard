"use client"
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
import CustomInputField from "./CustomInputField";
import { formSchema } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { getLoggedInUser, signIn, signup, signUpWithGithub } from "../../../lib/actions/user.action";
import { useRouter } from "next/navigation";

const AuthFrom = ({ type }: { type: string }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getLoggedInUser();
                setUser(userData);
            } catch (error) {
                console.error("Error fetching logged-in user:", error);
            }
        };

        fetchUser();
    }, []);

    const autFormSchema = formSchema(type);

    const form = useForm<z.infer<typeof autFormSchema>>({
        resolver: zodResolver(autFormSchema),
        defaultValues: {
            email: "",
        },
    });

    const handleGitHubOAuth = async () => {
        try {
            await signUpWithGithub();
        } catch (error) {
            setFormError("GitHub OAuth sign-up failed.");
        }
    };

    const onSubmit = async (values: z.infer<typeof autFormSchema>) => {
        setIsLoading(true);
        try {
            if (type === "sign-up") {
                const newUser = await signup(values);
                setUser(newUser);
                console.log(newUser);
            }
            if (type === "sign-in") {
                const response = await signIn({
                    email: values.email,
                    password: values.password,
                });
                if (response) router.push("/");
            }
        } catch (error) {
            setFormError(`Something went wrong while ${type}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {user ? (
                <h1 className=" text-green-600">SignUp Success</h1>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === "sign-up" && (
                                <>
                                    <div className=" flex gap-x-5">
                                        <CustomInputField
                                            control={form.control}
                                            name="firstName"
                                            placeholder="Enter Your First Name"
                                        />
                                        <CustomInputField
                                            control={form.control}
                                            name="lastName"
                                            placeholder="Enter Your Last Name"
                                        />
                                    </div>
                                    <CustomInputField
                                        control={form.control}
                                        name="address"
                                        placeholder="Enter Your Address"
                                    />
                                    <div className="flex gap-x-5">
                                        <CustomInputField
                                            control={form.control}
                                            name="state"
                                            placeholder="ex: NY"
                                        />
                                        <CustomInputField
                                            control={form.control}
                                            name="postalCode"
                                            placeholder="ex: 11101"
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
                            )}
                            <CustomInputField
                                control={form.control}
                                name="email"
                                placeholder="Enter Your Email"
                            />
                            <CustomInputField
                                control={form.control}
                                name="password"
                                placeholder="Enter Your Password"
                            />
                            <Button disabled={isLoading} type="submit" className="w-full bg-bankGradient">
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        {type === "sign-in" ? "log in" : "sign up"}
                                    </>
                                ) : (
                                    type === "sign-in" ? "log in" : "sign up"
                                )}
                            </Button>
                            <Button
                                className="w-full bg-bankGradient"
                                type="button"
                                onClick={handleGitHubOAuth}
                            >
                                Continue with Github
                            </Button>
                            {formError && <p className="text-red-500">{formError}</p>}
                            <p>
                                {type === "sign-in" ? "Don't" : "Already"} have an account?
                                <Link className="text-bankGradient" href={type === "sign-in" ? "/sign-up" : "/sign-in"}>
                                    {type === "sign-in" ? "Sign up" : "Log in"}
                                </Link>
                            </p>
                        </form>
                    </Form>
                </>
            )}
        </div>
    );
};

export default AuthFrom;
