import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

import DashboardLayout from "@/components/dashboard/Layout";
import { Metadata } from "next";
import CardDashboard from "../_components/CardDashbaord";
export const metadata: Metadata = {
  title: "Dashboard admin",
  description: "",
};
export default async function DashboardPage() {
  const session = await verifySession();

  if (!session?.isAuth) {
    redirect("/login");
  }

  if (session.role !== "admin") {
    redirect("/");
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="flex flex-col gap-4">
            <div className="w-full"></div>

            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-500">
                Welcome back, Administrator. Here is an overview of the system.
              </p>
            </div>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <CardDashboard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
