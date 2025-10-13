import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userService from "../services/users";
import { useNavigate } from "react-router-dom";

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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input type="text" placeholder="Username" {...register("username")} />
                {errors.username && <div>{errors.username.message}</div>}
            </div>
            <div>
                <input type="email" placeholder="Email" {...register("email")} />
                {errors.email && <div>{errors.email.message}</div>}
            </div>
            <div>
                <input type="password" placeholder="Password" {...register("password")} />
                {errors.password && <div>{errors.password.message}</div>}
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}
                />
                {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
            </div>

            {signupError && <div>{signupError}</div>}

            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignupForm;
