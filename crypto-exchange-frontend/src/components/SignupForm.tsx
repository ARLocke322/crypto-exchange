import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userService from "../services/users";
import { useNavigate } from "react-router-dom";

import { Button } from "./ui/button";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"


// Validation schema
const signupSchema = z
    .object({
        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username must be at most 20 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm: React.FC = () => {
    const [signupError, setSignupError] = useState<string | null>(null);
    const navigate = useNavigate()
    const form = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        mode: "onSubmit",
    });

    const onSubmit = async (data: SignupFormData) => {
        try {
            setSignupError(null);
            await userService.signup(data.email, data.username, data.password);
            navigate('/login')
        } catch {
            setSignupError("Invalid Signup Credentials");
        }
    };

    return (
        <section className="bg-muted h-screen">
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-6 lg:justify-start">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
                            <h1 className="text-xl font-semibold">Sign Up</h1>

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input placeholder="Username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input placeholder="Confirm password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {signupError && <div>{signupError}</div>}
                            <div className="w-full">
                                <Button type="submit" className="w-full">Sign Up</Button>
                            </div>
                        </form>



                    </Form >

                    <div className="text-muted-foreground flex justify-center gap-1 text-sm">
                        <p>Already have an account?</p>
                        <a href="/login" className="text-primary font-medium hover:underline">Login</a>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default SignupForm;
