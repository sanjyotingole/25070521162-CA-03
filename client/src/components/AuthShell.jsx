export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <main className="auth">
      <section className="auth-side">
        <h1 className="brand">FLEXI</h1>
        <p className="auth-pitch">Plan assignments, practicals and exams in one place, and see your week get lighter.</p>
        <ul className="auth-peek" aria-hidden="true">
          <li><span className="dot high" />Complete DSA practical<em>Fri</em></li>
          <li><span className="dot medium" />Revise DBMS unit 3<em>Sat</em></li>
          <li className="done"><span className="dot low" />Submit CA-03 on GitHub<em>Done</em></li>
        </ul>
      </section>
      <section className="auth-form">
        <div className="auth-card">
          <h2>{title}</h2>
          <p className="muted">{subtitle}</p>
          {children}
          <p className="auth-foot">{footer}</p>
        </div>
      </section>
    </main>
  );
}
