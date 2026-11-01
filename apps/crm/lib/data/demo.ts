import type { AuditEvent, Booking, BookingStatus, Customer, DemoData, Employee, Service } from "./types";

function mulberry32(seed: number) {
  return () => {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20261102);
const pick = <T,>(items: T[]) => items[Math.floor(rand() * items.length)];
const areas = ["Madhapur", "Gachibowli", "Kondapur", "Kukatpally", "Jubilee Hills", "Banjara Hills", "Miyapur", "Hitech City"];
const first = ["Aarav", "Aisha", "Aditya", "Ananya", "Arjun", "Diya", "Farhan", "Ira", "Kabir", "Meera", "Rehan", "Sara", "Vihaan", "Zoya", "Ishaan", "Nida"];
const last = ["Reddy", "Khan", "Sharma", "Rao", "Patel", "Moosavi", "Varma", "Ali", "Iyer", "Das"];
const customers: Customer[] = Array.from({ length: 40 }, (_, i) => ({
  id: `CUS-${String(i + 1).padStart(3, "0")}`,
  name: `${first[i % first.length]} ${last[Math.floor(rand() * last.length)]}`,
  phone: `+91 98${String(10000000 + Math.floor(rand() * 89999999)).slice(0, 8)}`,
  area: pick(areas), joined: `2026-${String(5 + Math.floor(rand() * 6)).padStart(2, "0")}-${String(1 + Math.floor(rand() * 27)).padStart(2, "0")}`,
  bookings: 1 + Math.floor(rand() * 8),
}));
const employees: Employee[] = Array.from({ length: 12 }, (_, i) => ({
  id: `EMP-${String(i + 1).padStart(3, "0")}`,
  name: `${first[(i + 3) % first.length]} ${last[(i + 2) % last.length]}`,
  phone: `+91 97${String(10000000 + Math.floor(rand() * 89999999)).slice(0, 8)}`,
  area: pick(areas), status: pick(["On duty", "Available", "Off duty"] as const),
  rating: Number((4 + rand()).toFixed(1)), jobs: Math.floor(rand() * 90),
}));
const services: Service[] = [
  { id: "SRV-001", name: "Essential Exterior Wash", vehicle: "Car", duration: 45, price: 299, active: true },
  { id: "SRV-002", name: "Premium Foam Wash", vehicle: "Car", duration: 60, price: 499, active: true },
  { id: "SRV-003", name: "Interior Deep Clean", vehicle: "Car", duration: 90, price: 899, active: true },
  { id: "SRV-004", name: "Complete Car Care", vehicle: "Car", duration: 120, price: 1299, active: true },
  { id: "SRV-005", name: "Bike Quick Wash", vehicle: "Bike", duration: 25, price: 149, active: true },
  { id: "SRV-006", name: "Bike Premium Detail", vehicle: "Bike", duration: 45, price: 349, active: true },
  { id: "SRV-007", name: "SUV Exterior Wash", vehicle: "Car", duration: 60, price: 599, active: true },
  { id: "SRV-008", name: "Waterless Eco Wash", vehicle: "Bike", duration: 30, price: 199, active: false },
];
const statuses: BookingStatus[] = ["Requested", "Confirmed", "Assigned", "In Progress", "Completed", "Cancelled"];
const bookings: Booking[] = Array.from({ length: 80 }, (_, i) => {
  const customer = pick(customers), service = pick(services), status = statuses[i % statuses.length];
  const employee = status === "Requested" || status === "Cancelled" ? null : pick(employees);
  const day = 1 + Math.floor(rand() * 2);
  return {
    id: `BK-${String(1001 + i).padStart(4, "0")}`, customerId: customer.id, employeeId: employee?.id ?? null,
    serviceId: service.id, date: `2026-11-${String(day).padStart(2, "0")}`,
    slot: pick(["08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00"]),
    status, amount: service.price, paymentStatus: pick(["Pending", "Paid", "Refunded"] as const),
    area: customer.area, vehicle: service.vehicle === "Car" ? pick(["Hatchback", "Sedan", "SUV"]) : pick(["Scooter", "Motorcycle"]),
  };
});
const audit: AuditEvent[] = [
  { id: "AUD-001", date: "2026-11-02 08:45", actor: "System", action: "Demo data loaded", target: "Workspace", detail: "Deterministic sample dataset initialised." },
  { id: "AUD-002", date: "2026-11-02 08:30", actor: "Operations", action: "Shift opened", target: "Hyderabad operations", detail: "Morning shift marked as active in the preview." },
  { id: "AUD-003", date: "2026-11-01 18:10", actor: "Finance", action: "Payment reconciled", target: "BK-1014", detail: "Sample payment marked paid." },
  { id: "AUD-004", date: "2026-11-01 16:25", actor: "Dispatcher", action: "Employee assigned", target: "BK-1022", detail: "Sample employee assignment recorded." },
];
export const demoData: DemoData = { customers, employees, services, bookings, audit };
