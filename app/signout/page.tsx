import { auth } from "@/auth"
import { signOut } from "@/auth"
import { SignOut } from "@/components/signout-button"

export default async function UserAvatar() {
    const session = await auth()

    if (!session || !session.user) return (
        <div>
            <a href="/signin">
                <button>Sign In</button>
            </a>
        </div>
    )

    return (
        <SignOut />
    )
}