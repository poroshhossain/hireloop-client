"use client"

import Link from "next/link";
import {
  AuthCardHeading,
  AuthDivider,
  SocialAuthRow,
} from "@/components/auth/ui";
import SignInForm, { SignInFormValues } from "@/components/auth/SignInForm";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";


export default function SignInPage() {
   const router = useRouter();
  const handleSignIn = async (userData:SignInFormValues ) => {
    const { data, error } = await authClient.signIn.email({
      email: userData.email, 
      password: userData.password, 
    });
    if (data) {
      console.log('login',data)
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
        title="Welcome back"
        description={
          <>
            New to HireLoop?{" "}
            <Link
              href="/get-started"
              className="font-medium text-primary-color hover:brightness-125"
            >
              Create a free account
            </Link>
          </>
        }
      />

      {/* TODO: wire up your auth provider (e.g. better-auth signIn) */}
      <SignInForm handleSignIn={handleSignIn}/>

      <div className="mt-8">
        <AuthDivider />
        <div className="mt-5">
          <SocialAuthRow />
        </div>
      </div>
    </>
  );
}
