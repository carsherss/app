import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CARSHERS CRM",
  description: "Operations dashboard for CARSHERS doorstep vehicle care."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
