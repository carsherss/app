import type { Metadata } from "next";
import { Workspace } from "../../components/workspace";
export const metadata: Metadata = { title: "Customers" };
export default function Page() { return <Workspace route="/customers" />; }
