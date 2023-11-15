import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import { getCurrentFirebaseUser } from "@/lib/auth/server/auth";
import { getSession } from "@/lib/auth/server/session";
import { redirect } from "next/navigation";
import { getCurrentViewer } from "@/lib/auth/server/get-current-viewer";

export const metadata: Metadata = {
  title: "Nest TODO App",
  description: "Generated by create next & next app",
};

export default async function AnonymousLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewer = await getCurrentViewer();
  if (viewer != null) {
    redirect("/tasks");
  }

  const { currentUser } = await getCurrentFirebaseUser(await getSession());
  if (currentUser != null) {
    redirect("/start");
  }

  return <>{children}</>;
}
