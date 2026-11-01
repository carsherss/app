import { demoData } from "./demo";
import type { DataSource, DemoData } from "./types";

export const demoSource: DataSource = { load: () => structuredClone(demoData) };
export function loadDemoData(): DemoData { return demoSource.load(); }
export type { DataSource, DemoData, Booking, BookingStatus, Customer, Employee, Service, AuditEvent } from "./types";
