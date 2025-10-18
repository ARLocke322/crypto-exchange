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
const loginSchema = z.object({
    username: z.string().nonempty("Username is required"),
    password: z.string().nonempty("Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
    const [loginError, setLoginError] = useState<string | null>(null);
    const navigate = useNavigate()

    // { register, handleSubmit, formState: { errors, isSubmitting } }
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setLoginError(null);
            await userService.login(data.username, data.password);
            navigate('/')
        } catch {
            setLoginError("Wrong username or password");
        }
    };

    return (
        <section className="bg-muted h-screen">
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-6 lg:justify-start">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
                            <h1 className="text-xl font-semibold">Login</h1>
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input placeholder="Password" {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {loginError && <div>{loginError}</div>}
                            <div className="w-full">
                                <Button type="submit" className="w-full">Log In</Button>
                            </div>

                        </form>
                    </Form >

                    <div className="text-muted-foreground flex justify-center gap-1 text-sm">
                        <p>Need an account?</p>
                        <a href="/signup" className="text-primary font-medium hover:underline">Sign up</a>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default LoginForm;

/*
<div>
                    <input type="text" placeholder="Username" {...register("username")} />
                    {errors.username && <div>{errors.username.message}</div>}
                </div>

                <div>
                    <input type="password" placeholder="Password" {...register("password")} />
                    {errors.password && <div>{errors.password.message}</div>}
                </div>
*/