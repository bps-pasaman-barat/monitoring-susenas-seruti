import { LoginForm } from "@/components/LoginForm";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
export default async function LoginPage() {
  const session = await verifySession()
  if (session){
    redirect("/")
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}
