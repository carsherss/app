const metrics = [
  { label: "Bookings today", value: "—", hint: "Connect the API to load live data" },
  { label: "Jobs in progress", value: "—", hint: "Operational status" },
  { label: "Employees on duty", value: "—", hint: "Staff availability" },
  { label: "Payments pending", value: "—", hint: "Reconciliation queue" }
];

export default function Home() {
  return (
    <main className="shell">
      <header className="topbar">
        <div className="brandMark">C</div>
        <div><div className="brand">CARSHERS</div><div className="tagline">OPERATIONS CONSOLE</div></div>
        <span className="environment">MVP PREVIEW</span>
      </header>
      <section className="hero">
        <p className="eyebrow">DOORSTEP VEHICLE CARE · HYDERABAD</p>
        <h1>Keep every wash<br /><span>moving smoothly.</span></h1>
        <p className="intro">One place to coordinate bookings, employees, service quality and payments.</p>
      </section>
      <section className="metrics" aria-label="Operational metrics">
        {metrics.map((metric) => <article className="metric" key={metric.label}>
          <p>{metric.label}</p><strong>{metric.value}</strong><small>{metric.hint}</small>
        </article>)}
      </section>
      <section className="panel">
        <div><h2>Operations workspace</h2><p>Live bookings will appear here after the API and authentication are implemented.</p></div>
        <div className="empty"><div className="emptyIcon">↗</div><strong>Ready for the first booking</strong><span>This preview uses no fake customer records or fabricated business metrics.</span></div>
      </section>
      <footer>CARSHERS · Cleaner Rides, Brighter Days · Internal MVP preview</footer>
    </main>
  );
}
