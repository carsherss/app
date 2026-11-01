import type { Metadata } from "next";
import { Workspace } from "../../components/workspace";
export const metadata: Metadata = { title: "Bookings" };
export default function Page() { return <Workspace route="/bookings" />; }
