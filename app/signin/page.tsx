import { redirect } from "next/navigation"
import { signIn, auth, providerMap } from "@/auth"
import { AuthError } from "next-auth"
import SignIn from "@/components/sign-in"

// https://authjs.dev/getting-started/authentication/oauth

export default async function SignInPage() {
    const session = await auth()
    if (session) {
        return redirect("/")
    }
    return (
        <div className="flex flex-col gap-2">
            <SignIn />
        </div>
    )
}