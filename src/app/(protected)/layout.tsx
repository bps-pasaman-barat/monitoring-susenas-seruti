import { SessionProvider } from "@/hooks/useSession";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session =   await verifySession()
  if (!session) {
    redirect("/login")
  }
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
    </>
  );
}
