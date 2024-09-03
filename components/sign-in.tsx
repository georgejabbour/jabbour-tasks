
import { signIn } from "@/auth"
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/20/solid"

export default function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google")
            }}
        >
            <button type="submit" className="flex gap-2">
                <ArrowRightEndOnRectangleIcon className="size-6 text-blue-500" />Sign In with Google</button>
        </form>
    )
} 