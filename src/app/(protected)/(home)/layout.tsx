import { Metadata } from "next";

export const metadata: Metadata = {
  title: "monitoring",
  description: "",
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return <div className="mx-auto">{children}</div>;
}
