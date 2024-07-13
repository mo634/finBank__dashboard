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
import { getLoggedInUser, signIn, signup, signUpWithGithub } from "../../../../lib/actions/user.action";
import { useRouter } from "next/navigation";
import SignUpInputFields from "./SignUpInputFields";

import { FaGithub } from 'react-icons/fa';
import { PlaidLink } from "react-plaid-link";
import PlaidLinkComponent from "../PlaidLinkComponent";

const AuthFrom = ({ type }: { type: string }) => {
    // ******************************  start states ***********************************
    const router = useRouter();
    const autFormSchema = formSchema(type);
    const [isLoading, setIsLoading] = useState(false);
    const [isGithubLoading, setIsGithubLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [formError, setFormError] = useState(null);
    const form = useForm<z.infer<typeof autFormSchema>>({
        resolver: zodResolver(autFormSchema),
        defaultValues: {
            email: "",
        },
    });

    //******************************  end states ***********************************


    //******************************  start functions  ***********************************

    const handleGitHubOAuth = async () => {
        setIsGithubLoading(true);
        try {
            await signUpWithGithub();
        } catch (error) {
            setFormError("GitHub OAuth sign-up failed.");
        } finally {
            setIsGithubLoading(false);
        }
    };

    const onSubmit = async (values: z.infer<typeof autFormSchema>) => {
        setIsLoading(true);
        try {
            if (type === "sign-up") {
                const newUser = await signup(values);

                console.log("newUser",newUser);
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

    useEffect(() => {
        getLoggedInUser().then((user) => {
            setUser(user);
        });
    }, []);


    //******************************  end functions  ***********************************


    return (
        <div>
            {user ? (

                <>
                    <h1 className=" text-green-600">SignUp Success</h1>
                    <PlaidLinkComponent user={user} />
                </>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/*start  form input fields */}
                            {type === "sign-up" && (
                                <SignUpInputFields formControl={form.control} />
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
                            {/* start  form input fields  */}

                            {/* start form btns */}

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


                            <button
                                className="w-full  px-4 py-2 bg-gray-900 text-white rounded-md flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                                type="button"
                                onClick={handleGitHubOAuth}
                            >

                                {isGithubLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        {"Loggin..."}
                                    </>
                                ) : (
                                    <>
                                        <FaGithub size={20} className="mr-2" />
                                        Continue with GitHub
                                    </>
                                )}
                            </button>

                            {/* end form btns */}

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
