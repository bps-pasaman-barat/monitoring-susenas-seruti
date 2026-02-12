import MainTabs from "@/components/MainTabs";
import { verifySession } from "@/lib/session";

export default async function Page() {
  const session = await verifySession();
  const role = session?.role || "user";

  return (
    <div className="min-h-screen bg-white p-6  ">
      <MainTabs role={role} />
    </div>
  );
}
