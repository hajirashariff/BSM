import React from 'react';

const users = [
  { id: 'U-1', name: 'Ava Agent', role: 'Agent' },
  { id: 'U-2', name: 'Sam Supervisor', role: 'Admin' }
];

export default function UsersPage() {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} · {u.role}</li>
        ))}
      </ul>
    </div>
  );
}



