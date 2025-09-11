import React from 'react';

const integrations = [
  { id: 'INT-SF', name: 'Salesforce', status: 'Connected' },
  { id: 'INT-SL', name: 'Slack', status: 'Not connected' }
];

export default function IntegrationsPage() {
  return (
    <div>
      <h1>Integrations</h1>
      <ul>
        {integrations.map((i) => (
          <li key={i.id}>{i.name} · {i.status}</li>
        ))}
      </ul>
    </div>
  );
}


