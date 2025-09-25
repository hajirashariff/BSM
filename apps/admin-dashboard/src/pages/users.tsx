import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Users as UsersIcon, Shield, UserCheck, Ban, CheckCircle, LayoutGrid, Download, Eye, Plus } from 'lucide-react';

type UserRole = 'Admin' | 'Agent' | 'Viewer';

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Suspended';
  avatarUrl?: string;
  lastLogin: string;
  registrationDate: string;
};

// Use a fixed anchor time to avoid SSR/CSR hydration mismatches
const ANCHOR_MS = Date.parse('2025-01-01T00:00:00.000Z');
const daysAgo = (d: number) => new Date(ANCHOR_MS - d * 86400000).toISOString();
const initialUsers: User[] = [
  { id: 'U-1001', name: 'Ava Agent', email: 'ava.agent@example.com', role: 'Agent', status: 'Active', lastLogin: daysAgo(2), registrationDate: daysAgo(90) },
  { id: 'U-1002', name: 'Sam Supervisor', email: 'sam.supervisor@example.com', role: 'Admin', status: 'Active', lastLogin: daysAgo(1), registrationDate: daysAgo(200) },
  { id: 'U-1003', name: 'Victor Viewer', email: 'victor.viewer@example.com', role: 'Viewer', status: 'Suspended', lastLogin: daysAgo(120), registrationDate: daysAgo(150) },
  { id: 'U-1004', name: 'Alice Admin', email: 'alice.admin@example.com', role: 'Admin', status: 'Active', lastLogin: daysAgo(50), registrationDate: daysAgo(20) },
  { id: 'U-1005', name: 'Gina Guest', email: 'gina.guest@example.com', role: 'Viewer', status: 'Active', lastLogin: daysAgo(10), registrationDate: daysAgo(5) },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | UserRole>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Suspended'>('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<keyof User>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [visibleColumns, setVisibleColumns] = useState<Record<'name'|'email'|'role'|'status', boolean>>({ name: true, email: true, role: true, status: true });
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Debounce search
  const [debounced, setDebounced] = useState('');
  useEffect(() => { const t = setTimeout(() => setDebounced(query), 250); return () => clearTimeout(t); }, [query]);
  // Persist filters for convenience
  useEffect(() => {
    try {
      const raw = localStorage.getItem('users.filters');
      if (raw) {
        const v = JSON.parse(raw);
        if (v.query !== undefined) setQuery(v.query);
        if (v.roleFilter) setRoleFilter(v.roleFilter);
        if (v.statusFilter) setStatusFilter(v.statusFilter);
      }
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem('users.filters', JSON.stringify({ query, roleFilter, statusFilter })); } catch {}
  }, [query, roleFilter, statusFilter]);

  // Use deterministic UTC formatting to avoid SSR/CSR hydration mismatches
  const formatDateTimeUTC = (iso: string) => {
    const d = new Date(iso);
    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    const hh = String(d.getUTCHours()).padStart(2, '0');
    const mi = String(d.getUTCMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${mi} UTC`;
  };
  const formatDateUTC = (iso: string) => {
    const d = new Date(iso);
    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const filtered = useMemo(() => users.filter(u => {
    const matchesQuery = `${u.name} ${u.email}`.toLowerCase().includes(debounced.toLowerCase());
    const matchesRole = roleFilter === 'All' ? true : u.role === roleFilter;
    const matchesStatus = statusFilter === 'All' ? true : u.status === statusFilter;
    return matchesQuery && matchesRole && matchesStatus;
  }), [users, debounced, roleFilter, statusFilter]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const A = String(a[sortBy]).toLowerCase();
      const B = String(b[sortBy]).toLowerCase();
      if (A < B) return sortDir === 'asc' ? -1 : 1;
      if (A > B) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return copy;
  }, [filtered, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageClamped = Math.min(page, totalPages);
  const paged = useMemo(() => sorted.slice((pageClamped - 1) * pageSize, (pageClamped) * pageSize), [sorted, pageClamped]);

  function toggleOne(id: string) { setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]); }
  function toggleAll() { const ids = paged.map(u => u.id); const all = ids.every(id => selectedIds.includes(id)); setSelectedIds(all ? selectedIds.filter(id => !ids.includes(id)) : Array.from(new Set([...selectedIds, ...ids]))); }
  function requestSort(col: keyof User) { if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortBy(col); setSortDir('asc'); } }

  function bulkStatus(status: 'Active' | 'Suspended') { setUsers(prev => prev.map(u => selectedIds.includes(u.id) ? { ...u, status } : u)); setSelectedIds([]); }
  function bulkDelete() { setUsers(prev => prev.filter(u => !selectedIds.includes(u.id))); setSelectedIds([]); }

  function exportCsv() {
    const headers = ['ID','Name','Email','Role','Status','Last Login','Registered'];
    const rows = filtered.map(u => [u.id,u.name,u.email,u.role,u.status,new Date(u.lastLogin).toLocaleString(),new Date(u.registrationDate).toLocaleDateString()]);
    const data = [headers.join(','), ...rows.map(r => r.map(c => String(c).replaceAll('"','""')).join(','))].join('\n');
    const url = URL.createObjectURL(new Blob([data], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a'); a.href = url; a.download = 'users.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  }
  function exportExcel() {
    const headers = ['ID','Name','Email','Role','Status','Last Login','Registered'];
    const rows = filtered.map(u => [u.id,u.name,u.email,u.role,u.status,new Date(u.lastLogin).toLocaleString(),new Date(u.registrationDate).toLocaleDateString()]);
    const html = `<html><head><meta charset="UTF-8"></head><body><table border="1"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${String(c).replace(/</g,'&lt;')}</td>`).join('')}</tr>`).join('')}</tbody></table></body></html>`;
    const url = URL.createObjectURL(new Blob([html], { type: 'application/vnd.ms-excel' }));
    const a = document.createElement('a'); a.href = url; a.download = 'users.xls'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  }
  function exportPdf() {
    const w = window.open('', '_blank'); if (!w) return;
    const rows = filtered.map(u=>`<tr><td>${u.id}</td><td>${u.name}</td><td>${u.email}</td><td>${u.role}</td><td>${u.status}</td><td>${new Date(u.lastLogin).toLocaleString()}</td><td>${new Date(u.registrationDate).toLocaleDateString()}</td></tr>`).join('');
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Users</title><style>body{font-family:Inter,Arial,sans-serif;padding:20px} table{width:100%;border-collapse:collapse} th,td{border:1px solid #ccc;padding:6px;font-size:12px;text-align:left} th{background:#f2f2f2}</style></head><body><h3>Users Export</h3><table><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Last Login</th><th>Registered</th></tr></thead><tbody>${rows}</tbody></table></body></html>`);
    w.document.close(); w.focus(); w.print();
  }

  return (
    <div className="space-y-6 max-w-screen-xl mx-auto">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search name, email..." className="px-3 py-2 h-10 w-72 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" />
          <select value={roleFilter} onChange={e=>setRoleFilter(e.target.value as any)} className="px-3 py-2 h-10 border border-gray-300 rounded-lg bg-white">
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Agent">Agent</option>
            <option value="Viewer">Viewer</option>
          </select>
          <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value as any)} className="px-3 py-2 h-10 border border-gray-300 rounded-lg bg-white">
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Dropdown label="Columns" icon={<LayoutGrid size={16} /> }>
            <div className="w-48 p-2 space-y-1">
              {(['name','email','role','status'] as const).map(col => (
                <label key={col} className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" checked={visibleColumns[col]} onChange={e=>setVisibleColumns(v=>({ ...v, [col]: e.target.checked }))} />
                  <span className="capitalize">{col}</span>
                </label>
              ))}
            </div>
          </Dropdown>
          <Dropdown label="Download" icon={<Download size={16} /> }>
            <div className="w-40 p-1">
              <button onClick={exportCsv} className="w-full text-left px-2 py-2 text-sm hover:bg-gray-50 rounded">CSV</button>
              <button onClick={exportExcel} className="w-full text-left px-2 py-2 text-sm hover:bg-gray-50 rounded">Excel</button>
              <button onClick={exportPdf} className="w-full text-left px-2 py-2 text-sm hover:bg-gray-50 rounded">PDF</button>
            </div>
          </Dropdown>
          <Dropdown label="Views" icon={<Eye size={16} /> }>
            <div className="w-56 p-2 text-xs text-gray-500">No saved views</div>
          </Dropdown>
          <button onClick={()=>setIsCreateOpen(true)} className="btn-primary h-10 flex items-center gap-2"><Plus size={16} /> Add User</button>
        </div>
      </div>

      {/* Quick filters */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <button aria-label="Clear filters" onClick={()=>{ setQuery(''); setRoleFilter('All'); setStatusFilter('All'); }} className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50">Clear</button>
        <span className="text-gray-400">|</span>
        <button onClick={()=>setRoleFilter('Admin')} className={`px-3 py-1.5 rounded-full border ${roleFilter==='Admin'?'bg-blue-50 text-blue-700 border-blue-200':'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>Admin</button>
        <button onClick={()=>setRoleFilter('Agent')} className={`px-3 py-1.5 rounded-full border ${roleFilter==='Agent'?'bg-emerald-50 text-emerald-700 border-emerald-200':'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>Agent</button>
        <button onClick={()=>setRoleFilter('Viewer')} className={`px-3 py-1.5 rounded-full border ${roleFilter==='Viewer'?'bg-amber-50 text-amber-800 border-amber-200':'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>Viewer</button>
        <span className="text-gray-400">·</span>
        <button onClick={()=>setStatusFilter('Active')} className={`px-3 py-1.5 rounded-full border ${statusFilter==='Active'?'bg-green-50 text-green-700 border-green-200':'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>Active</button>
        <button onClick={()=>setStatusFilter('Suspended')} className={`px-3 py-1.5 rounded-full border ${statusFilter==='Suspended'?'bg-red-50 text-red-700 border-red-200':'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>Suspended</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <SummaryCard onClick={()=>{ setRoleFilter('All'); setStatusFilter('All'); }} icon={<UsersIcon size={18} />} label="Total" value={filtered.length} />
        <SummaryCard onClick={()=>setRoleFilter('Admin')} icon={<Shield size={18} />} label="Admin" value={filtered.filter(u=>u.role==='Admin').length} color="blue" />
        <SummaryCard onClick={()=>setRoleFilter('Agent')} icon={<UserCheck size={18} />} label="Agent" value={filtered.filter(u=>u.role==='Agent').length} color="emerald" />
        <SummaryCard onClick={()=>setStatusFilter('Active')} icon={<CheckCircle size={18} />} label="Active" value={filtered.filter(u=>u.status==='Active').length} color="green" />
        <SummaryCard onClick={()=>setStatusFilter('Suspended')} icon={<Ban size={18} />} label="Suspended" value={filtered.filter(u=>u.status==='Suspended').length} color="amber" />
      </div>

      {/* Bulk actions */}
      <div className="flex items-center justify-between text-sm text-gray-700">
        <div>Selected: <span className="font-medium">{selectedIds.length}</span></div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded border border-gray-300 hover:bg-gray-50" onClick={()=>bulkStatus('Active')}>Activate</button>
          <button className="px-3 py-1.5 rounded border border-gray-300 hover:bg-gray-50" onClick={()=>bulkStatus('Suspended')}>Suspend</button>
          <button className="px-3 py-1.5 rounded border border-red-300 text-red-700 hover:bg-red-50" onClick={bulkDelete}>Delete</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left"><input type="checkbox" aria-label="Select all on page" checked={paged.length>0 && paged.every(u=>selectedIds.includes(u.id))} onChange={toggleAll} /></th>
                {visibleColumns.name && (<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={()=>requestSort('name')}>User {sortBy==='name' && (sortDir==='asc'?'▲':'▼')}</th>)}
                {visibleColumns.email && (<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={()=>requestSort('email')}>Email {sortBy==='email' && (sortDir==='asc'?'▲':'▼')}</th>)}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
                {visibleColumns.role && (<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={()=>requestSort('role')}>Role {sortBy==='role' && (sortDir==='asc'?'▲':'▼')}</th>)}
                {visibleColumns.status && (<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={()=>requestSort('status')}>Status {sortBy==='status' && (sortDir==='asc'?'▲':'▼')}</th>)}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paged.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><input type="checkbox" aria-label={`Select ${u.name}`} checked={selectedIds.includes(u.id)} onChange={()=>toggleOne(u.id)} /></td>
                  {visibleColumns.name && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {u.avatarUrl ? (<img src={u.avatarUrl} alt={u.name} className="w-8 h-8 object-cover" />) : (<span className="text-xs text-gray-700">{u.name.split(' ').map(p=>p[0]).slice(0,2).join('').toUpperCase()}</span>)}
                        </div>
    <div>
                          <div className="text-sm font-medium text-gray-900">{u.name}</div>
                          <div className="text-xs text-gray-500">{u.id}</div>
                        </div>
                      </div>
                    </td>
                  )}
                  {visibleColumns.email && (<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-[240px] truncate">{u.email}</td>)}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDateTimeUTC(u.lastLogin)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDateUTC(u.registrationDate)}</td>
                  {visibleColumns.role && (<td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs rounded bg-blue-50 text-blue-700 border border-blue-200">{u.role}</span></td>)}
                  {visibleColumns.status && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded border ${u.status==='Active'?'bg-green-50 text-green-700 border-green-200':'bg-amber-50 text-amber-700 border-amber-200'}`}>{u.status}</span>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-100">Edit</button>
                    <button className="px-3 py-1.5 rounded border border-red-300 text-red-700 hover:bg-red-50" onClick={()=>setUsers(prev=>prev.filter(x=>x.id!==u.id))}>Delete</button>
                  </td>
                </tr>
              ))}
              {paged.length===0 && (<tr><td colSpan={8} className="px-6 py-12 text-center text-gray-500 text-sm">No users found.</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-700">
        <div>Page <span className="font-medium">{pageClamped}</span> of <span className="font-medium">{totalPages}</span> · Total <span className="font-medium">{filtered.length}</span></div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded border border-gray-300 disabled:opacity-50" onClick={()=>setPage(1)} disabled={pageClamped===1}>« First</button>
          <button className="px-3 py-1.5 rounded border border-gray-300 disabled:opacity-50" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={pageClamped===1}>‹ Prev</button>
          <button className="px-3 py-1.5 rounded border border-gray-300 disabled:opacity-50" onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={pageClamped===totalPages}>Next ›</button>
          <button className="px-3 py-1.5 rounded border border-gray-300 disabled:opacity-50" onClick={()=>setPage(totalPages)} disabled={pageClamped===totalPages}>Last »</button>
        </div>
      </div>
      {isCreateOpen && (
        <CreateUserModal
          onClose={()=>setIsCreateOpen(false)}
          onCreate={(payload)=>{
            const id = `U-${Math.floor(1000 + Math.random()*9000)}`;
            const nowIso = new Date().toISOString();
            const newUser: User = { id, name: payload.name, email: payload.email, role: payload.role, status: payload.status, lastLogin: nowIso, registrationDate: nowIso };
            setUsers(prev=>[newUser, ...prev]);
            setIsCreateOpen(false);
          }}
        />
      )}
    </div>
  );
}

function SummaryCard({ icon, label, value, color, onClick }: { icon: React.ReactNode; label: string; value: number; color?: 'blue'|'emerald'|'green'|'amber'; onClick?: () => void }) {
  const colorMap: Record<string,string> = { blue:'border-blue-200 bg-blue-50/60 text-blue-800', emerald:'border-emerald-200 bg-emerald-50/60 text-emerald-800', green:'border-green-200 bg-green-50/60 text-green-800', amber:'border-amber-200 bg-amber-50/60 text-amber-800' };
  return (
    <button onClick={onClick} className={`text-left w-full flex items-center gap-3 px-4 py-3 rounded-xl border bg-white shadow-sm transition-colors hover:bg-gray-50 ${color ? colorMap[color] : 'border-gray-200'}`}>
      <div className="p-2 rounded-lg bg-gray-100 text-gray-700">{icon}</div>
      <div><div className="text-xs text-gray-500">{label}</div><div className="text-lg font-semibold">{value}</div></div>
    </button>
  );
}

function Dropdown({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement|null>(null);
  useEffect(() => { function onDoc(e: MouseEvent) { if (!ref.current) return; if (!ref.current.contains(e.target as Node)) setOpen(false); } document.addEventListener('mousedown', onDoc); return () => document.removeEventListener('mousedown', onDoc); }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={()=>setOpen(o=>!o)} className="btn-secondary h-10 flex items-center gap-2">{icon} {label}</button>
      {open && (<div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">{children}</div>)}
    </div>
  );
}

function CreateUserModal({ onClose, onCreate }: { onClose: () => void; onCreate: (u: { name: string; email: string; role: UserRole; status: 'Active'|'Suspended' }) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('Agent');
  const [status, setStatus] = useState<'Active'|'Suspended'>('Active');
  const valid = name.trim().length > 1 && /.+@.+\..+/.test(email);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-lg shadow-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200"><h3 className="text-lg font-semibold text-gray-900">Add User</h3></div>
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-700">Full name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" placeholder="Jane Doe" />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-700">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" placeholder="jane.doe@example.com" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-gray-700">Role</label>
              <select value={role} onChange={(e)=>setRole(e.target.value as UserRole)} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                <option value="Admin">Admin</option>
                <option value="Agent">Agent</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-700">Status</label>
              <select value={status} onChange={(e)=>setStatus(e.target.value as 'Active'|'Suspended')} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300">Cancel</button>
          <button disabled={!valid} onClick={()=> valid && onCreate({ name, email, role, status })} className={`px-4 py-2 rounded-lg text-white ${valid? 'bg-primary-600 hover:bg-primary-700':'bg-gray-300 cursor-not-allowed'}`}>Create</button>
        </div>
      </div>
    </div>
  );
}



