import type { Metadata } from "next";
import { Workspace } from "../../components/workspace";
export const metadata: Metadata = { title: "Activity log" };
export default function Page() { return <Workspace route="/audit" />; }
