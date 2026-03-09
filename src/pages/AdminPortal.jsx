import React, { useState } from 'react';
import {
    ShieldAlert,
    Settings,
    Users,
    Database,
    Lock,
    Activity,
    Terminal,
    ArrowRight,
    ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChangePasswordModal from '../components/ChangePasswordModal';
import NexalithLogo from '../components/NexalithLogo';
import { authService, jobService } from '../services/api';
import { useEffect } from 'react';
import JobDetailModal from '../components/JobDetailModal';

const AdminPortal = () => {
    const navigate = useNavigate();
    const [isChangePassOpen, setIsChangePassOpen] = useState(false);
    const [view, setView] = useState('health'); // health, users, jobs
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [newUserModal, setNewUserModal] = useState(false);
    const [newUser, setNewUser] = useState({ username: '', email: '', role: 'billing', full_name: '', password: '' });

    useEffect(() => {
        if (view === 'users') fetchUsers();
        if (view === 'jobs') fetchJobs();
    }, [view]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await authService.getUsers();
            setUsers(response.data);
        } catch (err) { console.error("Identity fetch failed", err); }
        setLoading(false);
    };

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await jobService.getJobs();
            setJobs(response.data);
        } catch (err) { console.error("Global trace fetch failed", err); }
        setLoading(false);
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            await authService.createUser(newUser);
            setNewUserModal(false);
            setNewUser({ username: '', email: '', role: 'billing', full_name: '', password: '' });
            fetchUsers();
        } catch (err) { alert(err.response?.data?.error || "Identity creation failed."); }
    };

    const toggleUserStatus = async (user) => {
        try {
            await authService.updateUser(user.id, { is_active: !user.is_active });
            fetchUsers();
        } catch (err) { console.error("Identity update failed", err); }
    };

    return (
        <div className="min-h-screen bg-[#0a0c10] text-gray-400 font-['Plus_Jakarta_Sans'] p-8 selection:bg-primary-500/30">
            {/* Cyber Header */}
            <div className="max-w-7xl mx-auto flex items-center justify-between mb-16">
                <div className="flex items-center">
                    <NexalithLogo size={0.9} theme="light" className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl mr-8" />
                    <div>
                        <h1 className="text-xl font-black text-white tracking-widest uppercase">System Core / Admin</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">Restricted Access Area</p>
                            <div className="h-2 w-[1px] bg-gray-800 mx-1"></div>
                            <p className="text-[9px] font-black text-primary-500 uppercase tracking-widest">Supervising: Operations Manager</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setView('jobs')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'jobs' ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20' : 'hover:text-white'}`}
                    >
                        Global Command
                    </button>
                    <button
                        onClick={() => setView('users')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'users' ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20' : 'hover:text-white'}`}
                    >
                        Identity Hub
                    </button>
                    <button
                        onClick={() => setView('health')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'health' ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20' : 'hover:text-white'}`}
                    >
                        System Health
                    </button>
                    <div className="h-4 w-[1px] bg-gray-800 mx-1"></div>
                    <button
                        onClick={() => setIsChangePassOpen(true)}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-primary-500 transition-colors"
                    >
                        <ShieldCheck size={14} /> Security Nexus
                    </button>
                </div>
            </div>

            <ChangePasswordModal
                isOpen={isChangePassOpen}
                onClose={() => setIsChangePassOpen(false)}
            />

            <div className="max-w-7xl mx-auto space-y-12 animate-fade-in">
                {view === 'health' && (
                    <>
                        {/* System Health Card */}
                        <div className="bg-[#11141b] border border-white/5 rounded-3xl p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <NexalithLogo size={2} variant="iconOnly" theme="light" />
                            </div>
                            <div className="relative z-10">
                                <h2 className="text-2xl font-black text-white mb-8 tracking-tight text-primary-500">Infrastructure Baseline</h2>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                    {[
                                        { label: 'Auth Node', status: 'Optimal', color: 'text-emerald-500' },
                                        { label: 'DB Cluster', status: 'Synced', color: 'text-emerald-500' },
                                        { label: 'Payer Bridge', status: 'Active', color: 'text-emerald-500' },
                                        { label: 'API Gateway', status: '0.4ms', color: 'text-primary-500' }
                                    ].map((stat, i) => (
                                        <div key={i} className="space-y-2">
                                            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{stat.label}</p>
                                            <p className={`text-sm font-black uppercase ${stat.color}`}>{stat.status}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 p-6 bg-black/40 rounded-2xl border border-white/5 font-mono text-[11px] leading-relaxed">
                                    <p className="text-emerald-500 mb-1">$ system_diagnostic --verbose</p>
                                    <p className="text-gray-500">[OK] Encryption Layers Verified (AES-256)</p>
                                    <p className="text-gray-500">[OK] BAA Compliance Tokens Valid</p>
                                    <p className="text-gray-500">[OK] All clinical nodes reporting nominal status...</p>
                                    <p className="text-primary-500/50 mt-2">Ready for operational deployment.</p>
                                </div>
                            </div>
                        </div>

                        {/* Technical Settings Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { icon: Database, label: 'Data Backups', color: 'text-blue-500' },
                                { icon: Settings, label: 'Environment', color: 'text-purple-500' },
                                { icon: Terminal, label: 'Command Log', color: 'text-gray-400' },
                                { icon: ShieldAlert, label: 'Incident Response', color: 'text-rose-500' }
                            ].map((item, i) => (
                                <div key={i} className="bg-[#11141b]/50 border border-white/5 rounded-2xl p-6 hover:bg-primary-500/5 transition-all cursor-pointer group">
                                    <item.icon size={20} className={`${item.color} mb-4`} />
                                    <h4 className="text-xs font-black text-white uppercase tracking-widest">{item.label}</h4>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {view === 'users' && (
                    <div className="bg-[#11141b] border border-white/5 rounded-3xl overflow-hidden animate-slide-up">
                        <div className="p-10 border-b border-white/5 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-white tracking-tight">Identity Management</h2>
                                <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mt-1">Authorized Staff Provisioning</p>
                            </div>
                            <button
                                onClick={() => setNewUserModal(true)}
                                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                                Provision New Staff
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-black/20 text-gray-600">
                                    <tr>
                                        <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest">User Node</th>
                                        <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest">Tactical Role</th>
                                        <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest">Protocol Email</th>
                                        <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest">Registry Status</th>
                                        <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-right">Auth Control</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {users.map((u) => (
                                        <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-10 py-6">
                                                <p className="text-sm font-black text-white mb-1">{u.full_name || u.username}</p>
                                                <p className="text-[10px] text-gray-600 font-mono">ID: {u.username}</p>
                                            </td>
                                            <td className="px-10 py-6">
                                                <span className={`inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-primary-900/40 text-primary-500' :
                                                    u.role === 'operations_manager' ? 'bg-amber-900/40 text-amber-500' :
                                                        'bg-blue-900/40 text-blue-500'
                                                    }`}>
                                                    {u.role.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-10 py-6">
                                                <p className="text-sm text-gray-500">{u.email}</p>
                                            </td>
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${u.is_active ? 'bg-emerald-500' : 'bg-gray-700'}`}></div>
                                                    <span className={`text-[10px] font-black uppercase ${u.is_active ? 'text-emerald-500' : 'text-gray-700'}`}>
                                                        {u.is_active ? 'Deployed' : 'Deactivated'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <button
                                                    onClick={() => toggleUserStatus(u)}
                                                    className={`text-[10px] font-black uppercase underline decoration-2 underline-offset-4 tracking-widest transition-colors ${u.is_active ? 'text-rose-500 hover:text-rose-400' : 'text-emerald-500 hover:text-emerald-400'}`}
                                                >
                                                    {u.is_active ? 'Revoke Access' : 'Re-Authorize'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {view === 'jobs' && (
                    <div className="bg-[#11141b] border border-white/5 rounded-3xl overflow-hidden animate-slide-up">
                        <div className="p-10 border-b border-white/5 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-white tracking-tight">Global Command Center</h2>
                                <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mt-1">Cross-Functional Pipeline View</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Active Signals</p>
                                    <p className="text-xl font-black text-white">{jobs.length}</p>
                                </div>
                                <Activity className="text-primary-500" size={24} />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-black/20 text-gray-600">
                                    <tr>
                                        <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest">Trace Node</th>
                                        <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest">Current Sector</th>
                                        <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest">Financial Load</th>
                                        <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest">Synchronized At</th>
                                        <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {jobs.map((j) => (
                                        <tr key={j.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-10 py-6">
                                                <p className="text-sm font-black text-white mb-1">#{j.claim_id}</p>
                                                <p className="text-[10px] text-gray-600 font-bold uppercase">{j.patient_name}</p>
                                            </td>
                                            <td className="px-10 py-6">
                                                <span className={`inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${j.status === 'escalated' ? 'bg-rose-900/40 text-rose-500 border border-rose-900' :
                                                    j.status === 'on_hold' ? 'bg-amber-900/40 text-amber-500 border border-amber-900' :
                                                        'bg-gray-800 text-gray-400'
                                                    }`}>
                                                    {j.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-10 py-6">
                                                <p className="text-sm font-black text-white">${parseFloat(j.claim_amount).toLocaleString()}</p>
                                            </td>
                                            <td className="px-10 py-6">
                                                <p className="text-xs text-gray-600 font-bold">{new Date(j.updated_at).toLocaleString()}</p>
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <button
                                                    onClick={() => setSelectedJob(j)}
                                                    className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all ml-auto"
                                                >
                                                    <ArrowRight size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Identity Provision Modal */}
            {newUserModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-fade-in">
                    <div className="bg-[#11141b] w-full max-w-lg border border-white/10 rounded-[2.5rem] p-12 shadow-2xl animate-scale-up">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-900/20">
                                <Users size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white tracking-tight">Provision Identity</h3>
                                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mt-1">Establishing New Staff Nexus</p>
                            </div>
                        </div>

                        <form onSubmit={handleCreateUser} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Identity ID</label>
                                    <input
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:border-primary-500/50 outline-none transition-all"
                                        placeholder="username"
                                        value={newUser.username}
                                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Full Entity Name</label>
                                    <input
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:border-primary-500/50 outline-none transition-all"
                                        placeholder="Clinical Name"
                                        value={newUser.full_name}
                                        onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Protocol Email</label>
                                <input
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:border-primary-500/50 outline-none transition-all"
                                    type="email"
                                    placeholder="node@nexalith.com"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Nexus Role</label>
                                    <select
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:border-primary-500/50 outline-none transition-all appearance-none cursor-pointer"
                                        value={newUser.role}
                                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                    >
                                        <option value="billing" className="bg-[#11141b]">Billing Staff</option>
                                        <option value="payment" className="bg-[#11141b]">Payment Staff</option>
                                        <option value="ar_denial" className="bg-[#11141b]">AR Denial Staff</option>
                                        <option value="operations_manager" className="bg-[#11141b]">Ops Manager</option>
                                        <option value="admin" className="bg-[#11141b]">System Admin</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Initialization Token</label>
                                    <input
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:border-primary-500/50 outline-none transition-all"
                                        type="password"
                                        placeholder="••••••••"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button
                                    type="submit"
                                    className="btn bg-primary-600 hover:bg-primary-700 text-white flex-1 py-4 text-[12px]"
                                >
                                    Authorize Provisioning
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setNewUserModal(false)}
                                    className="btn bg-white/5 hover:bg-white/10 text-gray-400 px-10 border border-white/5"
                                >
                                    Abort
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {selectedJob && (
                <JobDetailModal
                    job={selectedJob}
                    isOpen={!!selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}
        </div>
    );
};

export default AdminPortal;