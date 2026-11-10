import Link from "next/link";
import {
  AuthCardHeading,
  AuthDivider,
  SocialAuthRow,
} from "@/components/auth/ui";
import SignInForm from "@/components/auth/SignInForm";

export const metadata = {
  title: "Sign in — HireLoop",
};

export default function SignInPage() {
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
      <SignInForm />

      <div className="mt-8">
        <AuthDivider />
        <div className="mt-5">
          <SocialAuthRow />
        </div>
      </div>
    </>
  );
}
