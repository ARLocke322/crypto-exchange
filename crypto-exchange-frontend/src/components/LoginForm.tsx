import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userService from "../services/users";
import { useNavigate } from "react-router-dom";

// Validation schema
const loginSchema = z.object({
    username: z.string().nonempty("Username is required"),
    password: z.string().nonempty("Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
    const [loginError, setLoginError] = useState<string | null>(null);
    const navigate = useNavigate()


    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input type="text" placeholder="Username" {...register("username")} />
                {errors.username && <div>{errors.username.message}</div>}
            </div>

            <div>
                <input type="password" placeholder="Password" {...register("password")} />
                {errors.password && <div>{errors.password.message}</div>}
            </div>

            {loginError && <div>{loginError}</div>}

            <button type="submit" disabled={isSubmitting}>Log In</button>
        </form>
    );
};

export default LoginForm;
