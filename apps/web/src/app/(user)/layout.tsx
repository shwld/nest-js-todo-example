import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import { redirect } from "next/navigation";
import Header from "./_components/Header";
import { getCurrentViewer } from "@/lib/auth/server/get-current-viewer";
import { signOutSession } from "@/lib/auth/server/session";

export const metadata: Metadata = {
  title: "Nest TODO App",
  description: "Generated by create next & next app",
};

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewer = await getCurrentViewer();

  if (viewer == null) {
    redirect("/start");
  }

  async function signOut() {
    "use server";
    await signOutSession();
  }

  return (
    <>
      <Header viewer={viewer} onSignOut={signOut} />
      {children}
    </>
  );
}