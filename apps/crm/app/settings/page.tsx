import type { Metadata } from "next";
import { Workspace } from "../../components/workspace";
export const metadata: Metadata = { title: "Settings" };
export default function Page() { return <Workspace route="/settings" />; }
