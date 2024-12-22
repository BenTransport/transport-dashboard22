import "@/styles/globals.css";
import { getSession } from "@/auth";
import { Providers } from "../providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return <Providers session={session}>{children}</Providers>
}
