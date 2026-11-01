"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

const nav = [
  ["Overview", "/", "⌂"], ["Bookings", "/bookings", "▦"], ["Employees", "/employees", "◉"],
  ["Customers", "/customers", "♙"], ["Services", "/services", "✳"], ["Payments", "/payments", "₹"],
  ["Audit log", "/audit", "≡"], ["Settings", "/settings", "⚙"],
];
export function Shell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  useEffect(() => { document.documentElement.dataset.theme = light ? "light" : "dark"; }, [light]);
  useEffect(() => { setOpen(false); }, [path]);
  return <div className="app-frame">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`} aria-label="Main navigation">
      <div className="brand-lockup"><img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/logo-640.png`} alt="CARSHERS" /><div><b>CARSHERS</b><small>OPERATIONS CRM</small></div></div>
      <div className="nav-caption">WORKSPACE</div>
      <nav>{nav.map(([label, href, glyph]) => <Link key={href} href={href} className={`nav-link ${path === href ? "active" : ""}`} aria-current={path === href ? "page" : undefined}><span aria-hidden="true">{glyph}</span>{label}</Link>)}</nav>
      <div className="sidebar-bottom"><span className="online-dot" /> Preview environment <small>v0.2 · Static build</small></div>
    </aside>
    <div className="main-column">
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">☰</button>
        <div className="crumb">CARSHERS <span>/</span> OPERATIONS</div>
        <div className="top-actions"><span className="date-chip">MON, 02 NOV 2026</span><button className="theme-button" onClick={() => setLight(!light)} aria-label={`Switch to ${light ? "dark" : "light"} theme`}>{light ? "☾" : "☼"}</button><div className="avatar" aria-label="Demo administrator">SA</div></div>
      </header>
      <div className="demo-banner"><span className="demo-dot" /> DEMO DATA <span>All records are synthetic. Changes remain in this browser session and reset on reload.</span></div>
      <main id="main-content" className="content">{children}</main>
      <footer className="footer">CARSHERS · Hyderabad, Telangana <span>Static CRM preview · No live customer data</span></footer>
    </div>
  </div>;
}
