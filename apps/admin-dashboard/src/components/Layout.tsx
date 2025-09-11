import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/tickets', label: 'Tickets' },
  { href: '/accounts', label: 'Accounts' },
  { href: '/assets', label: 'Assets' },
  { href: '/workflows', label: 'Workflows' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/users', label: 'Users' },
  { href: '/knowledge', label: 'Knowledge' },
  { href: '/integrations', label: 'Integrations' },
  { href: '/settings', label: 'Settings' }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, system-ui, Arial' }}>
      <aside style={{ width: 240, borderRight: '1px solid #eee', padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>BSM Admin</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {navItems.map((item) => {
              const active = router.pathname === item.href;
              return (
                <li key={item.href} style={{ marginBottom: 8 }}>
                  <Link href={item.href} style={{
                    textDecoration: 'none',
                    color: active ? '#000' : '#444',
                    fontWeight: active ? 700 : 500
                  }}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <section style={{ flex: 1 }}>
        <header style={{ borderBottom: '1px solid #eee', padding: 16 }}>
          <strong>Admin Dashboard</strong>
        </header>
        <main style={{ padding: 24 }}>{children}</main>
      </section>
    </div>
  );
}


