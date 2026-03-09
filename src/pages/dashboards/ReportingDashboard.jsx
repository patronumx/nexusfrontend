import React, { useState, useEffect } from 'react';
import { jobService } from '../../services/api';
import {
    BarChart3,
    TrendingUp,
    DollarSign,
    Clock,
    Users,
    AlertCircle,
    RefreshCw,
    Activity,
    ChevronRight,
    PieChart,
    Target,
    FileCheck,
    Layout,
    ArrowUpRight,
    ArrowDownRight,
    Shield
} from 'lucide-react';
import NexalithLogo from '../../components/NexalithLogo';

const ReportingDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [metrics, setMetrics] = useState({});

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await jobService.getJobs();
            const allJobs = response.data;
            setJobs(allJobs);
            calculateMetrics(allJobs);
        } catch (err) {
            console.error("Error fetching data", err);
        } finally {
            setLoading(false);
        }
    };

    const calculateMetrics = (jobs) => {
        const totalJobs = jobs.length;
        const totalRevenue = jobs.reduce((sum, job) => sum + parseFloat(job.claim_amount || 0), 0);
        const totalCollected = jobs.reduce((sum, job) => sum + parseFloat(job.payment_amount || 0), 0);

        const statusCounts = jobs.reduce((acc, job) => {
            acc[job.status] = (acc[job.status] || 0) + 1;
            return acc;
        }, {});

        const priorityCounts = jobs.reduce((acc, job) => {
            acc[job.priority] = (acc[job.priority] || 0) + 1;
            return acc;
        }, {});

        const queueCounts = jobs.reduce((acc, job) => {
            acc[job.current_role] = (acc[job.current_role] || 0) + 1;
            return acc;
        }, {});

        const deniedJobs = jobs.filter(j => j.status === 'denied').length;
        const denialRate = totalJobs > 0 ? ((deniedJobs / totalJobs) * 100).toFixed(1) : 0;
        const collectionRate = totalRevenue > 0 ? ((totalCollected / totalRevenue) * 100).toFixed(1) : 0;
        const closedJobs = jobs.filter(j => ['paid_full', 'written_off', 'closed'].includes(j.status)).length;
        const completionRate = totalJobs > 0 ? ((closedJobs / totalJobs) * 100).toFixed(1) : 0;

        setMetrics({
            totalJobs,
            totalRevenue,
            totalCollected,
            outstandingBalance: totalRevenue - totalCollected,
            statusCounts,
            priorityCounts,
            queueCounts,
            denialRate,
            collectionRate,
            completionRate,
            closedJobs
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="space-y-12 animate-pulse">
                <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                    <div className="h-12 bg-gray-200 rounded-2xl w-1/3"></div>
                    <div className="h-12 bg-gray-200 rounded-2xl w-32"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-40 bg-gray-100 rounded-[2rem]"></div>)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 h-[500px] bg-gray-100 rounded-[2.5rem]"></div>
                    <div className="h-[500px] bg-gray-100 rounded-[2.5rem]"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-fade-in">
            {/* Intel Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
                <div>
                    <h2 className="text-4xl font-black text-[#111827] mb-2 tracking-tight">Clinical Intelligence</h2>
                    <div className="flex items-center gap-4">
                        <div className="clinical-badge bg-primary-50 text-primary-500 border-primary-100 py-1.5 px-3">
                            <NexalithLogo size={0.2} variant="iconOnly" className="mr-1" />
                            Full Network Audit
                        </div>
                        <div className="h-4 w-[1px] bg-gray-200"></div>
                        <p className="text-sm font-bold text-[#64748b]">Analytical Node: <span className="text-emerald-500 font-extrabold uppercase">Synchronized</span></p>
                    </div>
                </div>
                <button
                    onClick={fetchData}
                    className="btn btn-primary px-8 flex items-center gap-2"
                >
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    Recalculate Intelligence
                </button>
            </div>

            {/* Critical Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="stat-card group hover:scale-[1.02] transition-all">
                    <p className="subtle-label">Gross Revenue Portfolio</p>
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-3xl font-black text-gray-900 tracking-tight">${metrics.totalRevenue?.toLocaleString()}</span>
                        <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-500 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all">
                            <DollarSign size={20} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
                        <ArrowUpRight size={14} /> +12.4% vs prev week
                    </div>
                </div>

                <div className="stat-card group hover:scale-[1.02] transition-all">
                    <p className="subtle-label">Claim Denial Velocity</p>
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-3xl font-black text-gray-900 tracking-tight">{metrics.denialRate}%</span>
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-all">
                            <AlertCircle size={20} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-rose-500 text-[10px] font-bold uppercase tracking-widest">
                        <ArrowUpRight size={14} /> Elevated Risk
                    </div>
                </div>

                <div className="stat-card group hover:scale-[1.02] transition-all">
                    <p className="subtle-label">Settlement Efficiency</p>
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-3xl font-black text-gray-900 tracking-tight">{metrics.collectionRate}%</span>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
                        <NexalithLogo size={0.2} variant="iconOnly" className="animate-pulse" /> Optimal State
                    </div>
                </div>

                <div className="stat-card group hover:scale-[1.02] transition-all">
                    <p className="subtle-label">Operational Completion</p>
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-3xl font-black text-gray-900 tracking-tight">{metrics.completionRate}%</span>
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all">
                            <FileCheck size={20} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                        <Clock size={14} /> Normal Drift
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Advanced Distribution Analysis */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="medical-card p-10 bg-gradient-to-br from-white to-gray-50/50">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-14 h-14 bg-[#111827] text-white rounded-[1.25rem] flex items-center justify-center shadow-2xl">
                                <PieChart size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-[#111827] tracking-tight">Signal Distribution Analysis</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Volume allocation across lifecycle nodes</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                    <NexalithLogo size={0.3} variant="iconOnly" /> Lifecycle Status
                                </h4>
                                <div className="space-y-4">
                                    {Object.entries(metrics.statusCounts || {}).map(([status, count]) => (
                                        <div key={status} className="space-y-2">
                                            <div className="flex justify-between items-center px-1">
                                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{status.replace('_', ' ')}</span>
                                                <span className="text-xs font-black text-gray-900">{count}</span>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary-500 rounded-full transition-all duration-1000"
                                                    style={{ width: `${(count / metrics.totalJobs * 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                    <Target size={16} className="text-amber-500" /> Priority Segmentation
                                </h4>
                                <div className="space-y-4">
                                    {Object.entries(metrics.priorityCounts || {}).map(([priority, count]) => (
                                        <div key={priority} className="p-4 rounded-2xl border border-gray-100 bg-white hover:border-primary-200 transition-all flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${priority === 'urgent' ? 'bg-rose-500' :
                                                    priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                                                    }`}></div>
                                                <span className="text-xs font-black text-gray-900 uppercase tracking-widest">{priority}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-black text-gray-900 leading-none">{count}</p>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Operational Signals</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Queue Health Sidebar */}
                <div className="space-y-8">
                    <div className="medical-card p-10 bg-[#111827] text-white">
                        <div className="flex items-center gap-3 mb-10">
                            <Layers className="text-primary-400" size={20} />
                            <h3 className="text-sm font-black uppercase tracking-widest">Node Saturation</h3>
                        </div>

                        <div className="space-y-8">
                            {Object.entries(metrics.queueCounts || {}).map(([role, count]) => (
                                <div key={role} className="relative pl-6 border-l-2 border-white/10">
                                    <div className="absolute -left-[5px] top-0 w-2 h-2 bg-primary-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]"></div>
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{role.replace('_', ' ')} Node</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-black tracking-tight">{count} ACTIVE</span>
                                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">In Progress</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Network Fluidity Score</p>
                            <div className="flex items-end gap-3">
                                <span className="text-5xl font-black text-white leading-none tracking-tighter">9.8</span>
                                <span className="text-xs font-black text-emerald-400 uppercase mb-1 tracking-widest">Optimal Range</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportingDashboard;
