import type { Metadata } from "next";
import { Workspace } from "../../components/workspace";
export const metadata: Metadata = { title: "Payments" };
export default function Page() { return <Workspace route="/payments" />; }
