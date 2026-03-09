import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import OperationsManagerDashboard from './dashboards/OperationsManagerDashboard';
import BillingDashboard from './dashboards/BillingDashboard';
import PaymentDashboard from './dashboards/PaymentDashboard';
import ARDenialDashboard from './dashboards/ARDenialDashboard';
import ReportingDashboard from './dashboards/ReportingDashboard';
import { BarChart3, Activity, ArrowRight, LogOut, ShieldCheck } from 'lucide-react';
import ChangePasswordModal from '../components/ChangePasswordModal';
import NexalithLogo from '../components/NexalithLogo';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('dashboard');
    const [isChangePassOpen, setIsChangePassOpen] = useState(false);
    const [auditDept, setAuditDept] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const is_admin = user?.user_type === 'admin' || user?.role === 'admin';

    const renderRoleDashboard = () => {
        if (!user) return null;

        if (is_admin || user.role === 'operations_manager') {
            if (activeView === 'reports') {
                return <ReportingDashboard />;
            }

            if (activeView === 'audit' && auditDept) {
                if (auditDept === 'billing') return <BillingDashboard />;
                if (auditDept === 'payment') return <PaymentDashboard />;
                if (auditDept === 'ar_denial') return <ARDenialDashboard />;
            }

            return <OperationsManagerDashboard />;
        }

        if (user.role === 'billing') return <BillingDashboard />;
        if (user.role === 'payment') return <PaymentDashboard />;
        if (user.role === 'ar_denial') return <ARDenialDashboard />;

        return (
            <div className="medical-card p-12 text-center max-w-2xl mx-auto mt-20">
                <div className="w-20 h-20 bg-primary-50 text-primary-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <Activity size={40} />
                </div>
                <h2 className="text-3xl font-black text-slate-950 mb-4 tracking-tight">Access Initialized</h2>
                <p className="text-slate-500 font-medium mb-8 text-lg">
                    System node established for role: <strong className="text-primary-600 uppercase tracking-widest">{user?.role}</strong>
                </p>
                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 w-1/3 animate-pulse"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-bg-main flex flex-col font-sans">
            <header className="fixed top-0 left-0 right-0 h-24 bg-white/70 backdrop-blur-2xl border-b border-gray-100/50 flex items-center justify-between px-12 z-[100] shadow-sm">
                <div className="flex items-center gap-10">
                    <div className="flex items-center cursor-pointer group" onClick={() => navigate('/')}>
                        <NexalithLogo size={0.65} theme="light" />
                    </div>

                    <div className="hidden xl:flex items-center h-10 px-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Clinical Sync Active</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    {/* Command/Intelligence Toggle */}
                    {(is_admin || user?.role === 'operations_manager') && (
                        <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
                            <button
                                onClick={() => setActiveView('dashboard')}
                                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'dashboard' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                Command
                            </button>
                            <button
                                onClick={() => setActiveView('reports')}
                                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'reports' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                Intelligence
                            </button>
                        </div>
                    )}

                    {/* Audit Dropdown */}
                    {(is_admin || user?.role === 'operations_manager') && (
                        <div className="relative group">
                            <select
                                value={auditDept || ''}
                                onChange={(e) => {
                                    setAuditDept(e.target.value);
                                    setActiveView(e.target.value ? 'audit' : 'dashboard');
                                }}
                                className="appearance-none bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest pl-6 pr-10 py-3 rounded-2xl focus:ring-4 focus:ring-primary-500/10 outline-none cursor-pointer hover:border-primary-300 transition-all shadow-sm"
                            >
                                <option value="">Target: Live Command</option>
                                <option value="billing">Audit: Billing Unit</option>
                                <option value="payment">Audit: Payment Unit</option>
                                <option value="ar_denial">Audit: AR Denial Unit</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <Activity size={12} />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-6 pl-8 border-l border-slate-100">
                        <div className="text-right hidden sm:block">
                            <p className="text-[13px] font-black text-slate-900 leading-none mb-1">{user?.full_name || user?.username}</p>
                            <div className="flex items-center justify-end gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-500/30"></div>
                                <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black">
                                    Operator ID: {user?.role?.replace('_', '-')}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsChangePassOpen(true)}
                                className="w-12 h-12 flex items-center justify-center bg-white border border-slate-100 text-slate-400 hover:text-primary-500 hover:border-primary-100 rounded-2xl transition-all shadow-sm"
                                title="Security Protocol"
                            >
                                <ShieldCheck size={20} />
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-12 h-12 flex items-center justify-center bg-slate-900 text-slate-400 hover:text-white rounded-2xl transition-all shadow-lg shadow-slate-950/20"
                                title="Terminate Link"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-16 px-12 max-w-[1700px] mx-auto w-full">
                <div className="animate-fade-in">
                    {renderRoleDashboard()}
                </div>
            </main>

            <ChangePasswordModal
                isOpen={isChangePassOpen}
                onClose={() => setIsChangePassOpen(false)}
            />
        </div>
    );
};

export default Dashboard;
