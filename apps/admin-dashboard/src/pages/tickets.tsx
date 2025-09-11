import React from 'react';

const sample = [
  { id: 'TCK-1001', subject: 'VPN not working', priority: 'High', status: 'Open' },
  { id: 'TCK-1002', subject: 'Email setup', priority: 'Medium', status: 'In Progress' }
];

export default function TicketsPage() {
  return (
    <div>
      <h1>Tickets</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: 8 }}>ID</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: 8 }}>Subject</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: 8 }}>Priority</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: 8 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {sample.map((t) => (
            <tr key={t.id}>
              <td style={{ borderBottom: '1px solid #f3f3f3', padding: 8 }}>{t.id}</td>
              <td style={{ borderBottom: '1px solid #f3f3f3', padding: 8 }}>{t.subject}</td>
              <td style={{ borderBottom: '1px solid #f3f3f3', padding: 8 }}>{t.priority}</td>
              <td style={{ borderBottom: '1px solid #f3f3f3', padding: 8 }}>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


