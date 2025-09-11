import React from 'react';

const articles = [
  { id: 'KB-1', title: 'Reset password', views: 1240 },
  { id: 'KB-2', title: 'VPN setup', views: 860 }
];

export default function KnowledgePage() {
  return (
    <div>
      <h1>Knowledge Base</h1>
      <ul>
        {articles.map((a) => (
          <li key={a.id}>{a.title} · {a.views} views</li>
        ))}
      </ul>
    </div>
  );
}


