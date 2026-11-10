'use client'
import Link from "next/link"
import { AuthField, AuthSubmit } from "./ui"
import { useForm } from "react-hook-form";


export type SignInFormValues = {
    email: string;
    password: string;
    remember: boolean;
};

interface ISignInProps {
    handleSignIn: (userData: SignInFormValues) => Promise<void>
}
const SignInForm = ({ handleSignIn }: ISignInProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormValues>({
        defaultValues: {
            email: "",
            password: "",
            remember: false
        },
    });
    const onSubmit = async (userData: SignInFormValues) => {
        await handleSignIn(userData)
    }
    return (
        <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <AuthField
                label="Email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email", {
                    required: "Email is required",
                })}
                error={errors.email?.message}
            />

            <AuthField
                label="Password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                {...register("password", {
                    required: "Password is required",
                })}
                error={errors.password?.message}
            />

            {/* remember / forgot row */}
            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-light/70">
                    <input
                        type="checkbox"
                        {...register('remember')}
                        className="size-4 rounded border-border-color/40 bg-dark-secoundary/60 accent-primary-color"
                    />
                    Remember me
                </label>
                <Link
                    href="/forgot-password"
                    className="text-sm text-light/60 transition-colors hover:text-light"
                >
                    Forgot password?
                </Link>
            </div>

            <AuthSubmit disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
            </AuthSubmit>
        </form>
    )
}
export default SignInForm