import { signOut } from "@/auth"
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/20/solid"

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <button type="submit" className="flex gap-2">
                <ArrowLeftStartOnRectangleIcon className="size-6 text-blue-500" />
                Sign Out</button>
        </form>
    )
}