"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { loadDemoData } from "../lib/data";
import type { Booking, BookingStatus, DemoData, Employee } from "../lib/data";

const money = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const statusClass = (s: string) => s.toLowerCase().replaceAll(" ", "-");
const titles: Record<string, { title: string; desc: string }> = {
  "/": { title: "Good morning, Admin", desc: "Here is what is happening across your doorstep service operations." },
  "/bookings": { title: "Bookings", desc: "Review service requests, allocate teams and track every job." },
  "/employees": { title: "Employees", desc: "Monitor team availability and operational coverage." },
  "/customers": { title: "Customers", desc: "Browse customer profiles and service history." },
  "/services": { title: "Service catalogue", desc: "Manage the services offered across cars and bikes." },
  "/payments": { title: "Payments", desc: "Review collections and outstanding balances." },
  "/audit": { title: "Activity log", desc: "A chronological record of preview workspace activity." },
  "/settings": { title: "Workspace settings", desc: "Preview configuration and operating information." },
};
function Panel({ children, title, action }: { children: ReactNode; title: string; action?: React.ReactNode }) {
  return <section className="panel"><div className="panel-head"><h2>{title}</h2>{action}</div>{children}</section>;
}
export function Workspace({ route }: { route: string }) {
  const initial = useMemo(() => loadDemoData(), []);
  const [data, setData] = useState<DemoData>(initial);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [notice, setNotice] = useState("");
  const [drawer, setDrawer] = useState<Booking | Employee | null>(null);
  const drawerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!drawer) return;
    const panel = drawerRef.current;
    panel?.querySelector<HTMLElement>("button, select, input, a[href]")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setDrawer(null); return; }
      if (event.key !== "Tab" || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>('button:not([disabled]), select:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const firstItem = focusable[0], lastItem = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) { event.preventDefault(); lastItem.focus(); }
      else if (!event.shiftKey && document.activeElement === lastItem) { event.preventDefault(); firstItem.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [drawer]);

  const meta = titles[route] ?? titles["/"];
  const bookings = data.bookings;
  const today = bookings.filter(b => b.date === "2026-11-02");
  const completed = bookings.filter(b => b.status === "Completed");
  const pending = bookings.filter(b => b.paymentStatus === "Pending");
  const employees = data.employees;
  const filtered = <T extends { id: string }>(items: T[]): T[] => items.filter(item => { const x = item as T & { name?: string; status?: string; phone?: string; area?: string }; return `${x.id} ${x.name ?? ""} ${x.phone ?? ""} ${x.area ?? ""}`.toLowerCase().includes(query.toLowerCase()) && (filter === "All" || x.status === filter); });
  function updateStatus(id: string, status: BookingStatus) {
    setData(d => ({ ...d, bookings: d.bookings.map(b => b.id === id ? { ...b, status, employeeId: status === "Requested" || status === "Cancelled" ? null : b.employeeId ?? d.employees[0].id } : b), audit: [{ id: `AUD-${Date.now()}`, date: "2026-11-02 09:15", actor: "Demo administrator", action: "Booking status changed", target: id, detail: `Status set to ${status} in local preview.` }, ...d.audit] }));
    setNotice(`${id} updated to ${status}. This change is local to this preview.`);
    setDrawer(null);
  }
  function assign(id: string, employeeId: string) {
    setData(d => ({ ...d, bookings: d.bookings.map(b => b.id === id ? { ...b, employeeId, status: "Assigned" } : b), audit: [{ id: `AUD-${Date.now()}`, date: "2026-11-02 09:20", actor: "Demo administrator", action: "Employee assigned", target: id, detail: `${employeeId} assigned in local preview.` }, ...d.audit] }));
    setNotice(`${employeeId} assigned to ${id}. This change is local to this preview.`);
  }
  const heading = <div className="page-heading"><div><div className="eyebrow">OPERATIONS / {route === "/" ? "OVERVIEW" : route.slice(1).toUpperCase()}</div><h1>{meta.title}</h1><p>{meta.desc}</p></div>{route === "/bookings" && <button className="primary" onClick={() => setNotice("New booking creation is intentionally disabled until the booking API is connected.")}>＋ New booking</button>}</div>;
  const search = <div className="table-tools"><input aria-label="Search records" placeholder="Search by name, ID, phone or area…" value={query} onChange={e => setQuery(e.target.value)} /><select aria-label="Filter records" value={filter} onChange={e => setFilter(e.target.value)}><option>All</option>{(route === "/bookings" ? ["Requested","Confirmed","Assigned","In Progress","Completed","Cancelled"] : route === "/employees" ? ["On duty","Available","Off duty"] : []).map(s => <option key={s}>{s}</option>)}</select></div>;
  return <>{heading}{notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice("")} aria-label="Dismiss notification">×</button></div>}
    {route === "/" && <>
      <div className="kpi-grid">
        {[["Bookings today", today.length, "Today's scheduled jobs", "▦"], ["Jobs completed", completed.length, "Across all sample dates", "✓"], ["Employees on duty", employees.filter(e=>e.status==="On duty").length, "Team availability", "◉"], ["Payments pending", money(pending.reduce((a,b)=>a+b.amount,0)), `${pending.length} outstanding sample payments`, "₹"]].map(([label,value,hint,glyph]) => <article className="kpi" key={String(label)}><div className="kpi-top"><span>{label}</span><b>{glyph}</b></div><strong>{value}</strong><small>{hint}</small></article>)}
      </div>
      <div className="dashboard-grid">
        <Panel title="Booking activity"><div className="chart-legend"><span><i className="legend-blue"/>Bookings</span><span><i className="legend-cyan"/>Completed</span></div><div className="bar-chart" role="img" aria-label="Sample booking counts for the last seven days">{[28,42,34,57,48,68,53].map((v,i)=><div className="bar-group" key={i}><div className="bar-pair"><i style={{height:`${v}%`}}/><i style={{height:`${Math.max(12,v-22)}%`}}/></div><small>{["Tue","Wed","Thu","Fri","Sat","Sun","Mon"][i]}</small></div>)}</div></Panel>
        <Panel title="Booking status"><div className="status-breakdown">{(["Requested","Confirmed","Assigned","In Progress","Completed","Cancelled"] as BookingStatus[]).map(s=><div key={s}><span className={`status-dot ${statusClass(s)}`}/><span>{s}</span><b>{bookings.filter(b=>b.status===s).length}</b></div>)}</div></Panel>
      </div>
      <Panel title="Latest bookings" action={<Link href="/bookings/">View all bookings →</Link>}><BookingTable items={bookings.slice(0,6)} customers={data} onSelect={setDrawer}/></Panel>
    </>}
    {route === "/bookings" && <Panel title={`${bookings.length} bookings`} action={search}><BookingTable items={filtered(bookings) as Booking[]} customers={data} onSelect={setDrawer} onStatus={updateStatus} onAssign={assign} employees={employees}/></Panel>}
    {route === "/employees" && <Panel title={`${employees.length} team members`} action={search}><div className="data-table-wrap"><table><thead><tr><th>Employee</th><th>Coverage area</th><th>Availability</th><th>Rating</th><th>Jobs done</th><th>Contact</th></tr></thead><tbody>{filtered(employees).map(e=><tr key={e.id}><td><b>{e.name}</b><small>{e.id}</small></td><td>{e.area}</td><td><span className={`pill ${statusClass(e.status)}`}>{e.status}</span></td><td>★ {e.rating}</td><td>{e.jobs}</td><td>{e.phone}</td></tr>)}</tbody></table></div></Panel>}
    {route === "/customers" && <Panel title={`${data.customers.length} customers`} action={search}><div className="data-table-wrap"><table><thead><tr><th>Customer</th><th>Phone</th><th>Area</th><th>Joined</th><th>Bookings</th></tr></thead><tbody>{filtered(data.customers).map(c=><tr key={c.id}><td><b>{c.name}</b><small>{c.id}</small></td><td>{c.phone}</td><td>{c.area}</td><td>{c.joined}</td><td>{c.bookings}</td></tr>)}</tbody></table></div></Panel>}
    {route === "/services" && <Panel title={`${data.services.length} services`}><div className="service-grid">{data.services.map(s=><article className="service-card" key={s.id}><div className="service-icon">{s.vehicle==="Car"?"▰":"◒"}</div><span className={`pill ${s.active?"paid":"off-duty"}`}>{s.active?"Active":"Inactive"}</span><h3>{s.name}</h3><p>{s.vehicle} · {s.duration} min</p><strong>{money(s.price)}</strong><small>{s.id}</small></article>)}</div></Panel>}
    {route === "/payments" && <><div className="kpi-grid three">{[["Collected",money(data.bookings.filter(b=>b.paymentStatus==="Paid").reduce((a,b)=>a+b.amount,0))],["Outstanding",money(pending.reduce((a,b)=>a+b.amount,0))],["Refunded",money(data.bookings.filter(b=>b.paymentStatus==="Refunded").reduce((a,b)=>a+b.amount,0))]].map(([l,v])=><article className="kpi" key={l}><span>{l}</span><strong>{v}</strong><small>Sample values · INR</small></article>)}</div><Panel title="Payment register"><div className="data-table-wrap"><table><thead><tr><th>Booking</th><th>Customer</th><th>Amount</th><th>Method</th><th>Status</th><th>Date</th></tr></thead><tbody>{bookings.map(b=><tr key={b.id}><td><b>{b.id}</b></td><td>{data.customers.find(c=>c.id===b.customerId)?.name}</td><td>{money(b.amount)}</td><td>{b.paymentStatus==="Paid"?"UPI":"—"}</td><td><span className={`pill ${statusClass(b.paymentStatus)}`}>{b.paymentStatus}</span></td><td>{b.date}</td></tr>)}</tbody></table></div></Panel></>}
    {route === "/audit" && <Panel title="Recent workspace events"><div className="timeline">{data.audit.map(a=><article key={a.id}><span className="timeline-dot"/><div><div className="timeline-head"><b>{a.action}</b><time>{a.date}</time></div><p>{a.detail}</p><small>{a.actor} · {a.target}</small></div></article>)}</div></Panel>}
    {route === "/settings" && <div className="settings-grid"><Panel title="Workspace profile"><dl className="settings-list"><div><dt>Business</dt><dd>CARSHERS</dd></div><div><dt>Service region</dt><dd>Hyderabad, Telangana</dd></div><div><dt>Operating model</dt><dd>Doorstep car and bike wash</dd></div><div><dt>Environment</dt><dd><span className="pill requested">Static demo</span></dd></div><div><dt>Data anchor</dt><dd>02 November 2026</dd></div></dl></Panel><Panel title="Preview controls"><p>All interactions update local component state only. Reloading the page restores the original deterministic sample dataset.</p><button className="secondary" onClick={()=>{setData(loadDemoData());setNotice("Demo data has been reset to its original state.");}}>Reset demo data</button></Panel><Panel title="Integration status"><div className="integration-row"><span>Customer API</span><span className="pill off-duty">Not connected</span></div><div className="integration-row"><span>Authentication</span><span className="pill off-duty">Not connected</span></div><div className="integration-row"><span>Payments gateway</span><span className="pill off-duty">Not connected</span></div><div className="integration-row"><span>Live dispatch</span><span className="pill off-duty">Not connected</span></div></Panel></div>}
    {drawer && <div className="drawer-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setDrawer(null);}}><section ref={drawerRef} tabIndex={-1} className="drawer" role="dialog" aria-modal="true" aria-label="Record details"><button className="drawer-close" onClick={()=>setDrawer(null)} aria-label="Close details">×</button><div className="eyebrow">RECORD DETAILS</div><h2>{"id" in drawer ? drawer.id : "Details"}</h2>{"customerId" in drawer ? <><p>{data.customers.find(c=>c.id===drawer.customerId)?.name}</p><dl className="settings-list"><div><dt>Service</dt><dd>{data.services.find(s=>s.id===drawer.serviceId)?.name}</dd></div><div><dt>Date / slot</dt><dd>{drawer.date} · {drawer.slot}</dd></div><div><dt>Area</dt><dd>{drawer.area}</dd></div><div><dt>Amount</dt><dd>{money(drawer.amount)}</dd></div></dl><label className="field-label">Assign employee<select value={drawer.employeeId ?? ""} onChange={e=>assign(drawer.id,e.target.value)}><option value="">Unassigned</option>{employees.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}</select></label><label className="field-label">Update status<select value={drawer.status} onChange={e=>updateStatus(drawer.id,e.target.value as BookingStatus)}>{(["Requested","Confirmed","Assigned","In Progress","Completed","Cancelled"] as BookingStatus[]).map(s=><option key={s}>{s}</option>)}</select></label></> : <p>{(drawer as Employee).name}</p>}</section></div>}
  </>;
}
function BookingTable({items,customers,onSelect,onStatus,onAssign,employees}: {items:Booking[];customers:DemoData;onSelect:(b:Booking)=>void;onStatus?:(id:string,s:BookingStatus)=>void;onAssign?:(id:string,e:string)=>void;employees?:Employee[]}) {
  return <div className="data-table-wrap"><table><thead><tr><th>Booking</th><th>Customer</th><th>Service / vehicle</th><th>Schedule</th><th>Area</th><th>Employee</th><th>Status</th><th>Amount</th></tr></thead><tbody>{items.map(b=><tr key={b.id}><td><button className="text-button" onClick={()=>onSelect(b)}>{b.id}</button></td><td>{customers.customers.find(c=>c.id===b.customerId)?.name ?? "—"}</td><td>{customers.services.find(s=>s.id===b.serviceId)?.name}<small>{b.vehicle}</small></td><td>{b.date}<small>{b.slot}</small></td><td>{b.area}</td><td>{customers.employees.find(e=>e.id===b.employeeId)?.name ?? "Unassigned"}</td><td>{onStatus ? <select className="inline-select" aria-label={`Status for ${b.id}`} value={b.status} onChange={e=>onStatus(b.id,e.target.value as BookingStatus)}>{(["Requested","Confirmed","Assigned","In Progress","Completed","Cancelled"] as BookingStatus[]).map(s=><option key={s}>{s}</option>)}</select> : <span className={`pill ${statusClass(b.status)}`}>{b.status}</span>}</td><td>{money(b.amount)}</td></tr>)}</tbody></table>{items.length===0&&<div className="empty-state">No records match this search.</div>}</div>;
}
