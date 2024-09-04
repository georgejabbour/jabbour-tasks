import { auth } from "@/auth"
import { signOut } from "@/auth"
import HomeHero from "@/components/home-hero"
import SignIn from "@/components/sign-in"
import { SignOut } from "@/components/signout-button"
import { redirect } from "next/navigation"

export default async function UserAvatar() {
    const session = await auth()

    if (!session || !session.user) {
        return redirect("/")
    }

    return (
        <SignOut />
    )
}