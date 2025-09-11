import React from 'react';

const assets = [
  { id: 'AS-1', name: 'DB Server', status: 'Healthy', owner: 'Platform' },
  { id: 'AS-2', name: 'API Gateway', status: 'Degraded', owner: 'SRE' }
];

export default function AssetsPage() {
  return (
    <div>
      <h1>Assets</h1>
      <ul>
        {assets.map((a) => (
          <li key={a.id}>{a.name} · {a.status} · {a.owner}</li>
        ))}
      </ul>
    </div>
  );
}


