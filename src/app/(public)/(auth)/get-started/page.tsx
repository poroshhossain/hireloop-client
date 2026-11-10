"use client"

import Link from "next/link";
import {
  AuthCardHeading,
  AuthDivider,
  SocialAuthRow,
} from "@/components/auth/ui";
import GetStardForm, { GetStartedFormValues } from "@/components/auth/GetStardForm";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";


export default function GetStartedPage() {
  const router = useRouter();
  const handleSignUp = async (userData: GetStartedFormValues) => {
    const { data, error } = await authClient.signUp.email({
      name: userData.name, // required, The name of the user.
      email: userData.email, // required, The email address of the user.
      password: userData.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
      callbackURL: "/get-started", // An optional URL to redirect to after the user signs up.
    });
    if (data) {
      router.refresh();
      toast.add({
        type:'success',
        description: `sucessfully created`
      })
    }
    if(error){
      toast.add({
        type:'error',
        description:`error: ${error.message}`
      })
    }

  }
  return (
    <>
      <AuthCardHeading
        title="Create your free account"
        description={
          <>
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-primary-color hover:brightness-125"
            >
              Sign in
            </Link>
          </>
        }
      />

      {/* TODO: wire up your auth provider (e.g. better-auth signUp) */}
      <GetStardForm handleSignUp={handleSignUp} />

      <div className="mt-8">
        <AuthDivider />
        <div className="mt-5">
          <SocialAuthRow />
        </div>
      </div>
    </>
  );
}
