'use client'
import { AuthField, AuthSubmit } from "./ui"
import { AuthRoleSelect } from "./role-select"
import { useForm } from "react-hook-form"


export type GetStartedFormValues = {
    name: string;
    email: string;
    password: string;
    role: "job-seeker" | "employer"; // only these can self-register; admins are provisioned server-side
};
interface IGetStardForm {
    handleSignUp: (userData: GetStartedFormValues) => Promise<void>
}
const GetStardForm = ({ handleSignUp }: IGetStardForm) => {
    const { register, reset, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<GetStartedFormValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "job-seeker",
        },
    });
    const onSubmit = async (userData: GetStartedFormValues) => {
        await handleSignUp(userData)
        reset()
    }
    return (
        <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Role selection — submits `role` ("job-seeker" | "employer") with the form body */}
            <AuthRoleSelect control={control} />

            <AuthField
                label="Full name"
                type="text"
                placeholder="Alex Morgan"
                autoComplete="name"
                {...register('name', {
                    required: 'Full name is required'
                })}
                error={errors.name?.message}
            />

            <AuthField
                label="Email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register('email', {
                    required: 'Email is Required'
                })}
                error={errors.email?.message}
            />

            <AuthField
                label="Password"
                type="password"
                placeholder="8+ characters"
                autoComplete="new-password"
                minLength={8}
                {...register('password', {
                    required: 'password is required'
                })}
                error={errors.password?.message}
            />


            <AuthSubmit disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create free account"}
            </AuthSubmit>
        </form>
    )
}
export default GetStardForm