import React from 'react';

const workflows = [
  { id: 'WF-IT-1', name: 'Onboarding', steps: 7 },
  { id: 'WF-FIN-2', name: 'Invoice Approval', steps: 5 }
];

export default function WorkflowsPage() {
  return (
    <div>
      <h1>Workflows</h1>
      <ul>
        {workflows.map((w) => (
          <li key={w.id}>{w.name} · {w.steps} steps</li>
        ))}
      </ul>
    </div>
  );
}



