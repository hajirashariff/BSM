import React from 'react';

const accounts = [
  { id: 'AC-1', name: 'Contoso Ltd', health: 86, renewal: '2026-03-01' },
  { id: 'AC-2', name: 'Fabrikam Inc', health: 72, renewal: '2025-12-15' }
];

export default function AccountsPage() {
  return (
    <div>
      <h1>Accounts</h1>
      <ul>
        {accounts.map((a) => (
          <li key={a.id}>{a.name} · Health {a.health}% · Renewal {a.renewal}</li>
        ))}
      </ul>
    </div>
  );
}


