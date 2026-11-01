import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Shell } from "../components/shell";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: { default: "CARSHERS CRM", template: "%s · CARSHERS CRM" },
  description: "Operations workspace for CARSHERS doorstep vehicle care in Hyderabad.",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: `${basePath}/brand/favicon-32.png`, sizes: "32x32", type: "image/png" },
      { url: `${basePath}/brand/favicon.ico` },
    ],
    apple: `${basePath}/brand/apple-touch-icon.png`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><Shell>{children}</Shell></body></html>;
}
