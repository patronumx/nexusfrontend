import React, { useState, useEffect } from 'react';
import { jobService } from '../services/api';
import { AlertTriangle, Clock, TrendingUp, Users } from 'lucide-react';

const StuckJobsWidget = () => {
    const [stuckJobs, setStuckJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);

    const fetchStuckJobs = async () => {
        setLoading(true);
        try {
            const response = await jobService.getStuckJobs();
            setStuckJobs(response.data.jobs || []);
        } catch (err) {
            console.error("Error fetching stuck jobs", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStuckJobs();
        // Refresh every 5 minutes
        const interval = setInterval(fetchStuckJobs, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const criticalJobs = stuckJobs.filter(job => job.severity === 'critical');
    const warningJobs = stuckJobs.filter(job => job.severity === 'warning');

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="animate-pulse flex flex-col gap-4">
                    <div className="h-6 bg-gray-100 rounded-lg w-1/3"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-gray-50 rounded-2xl"></div>
                        <div className="h-24 bg-gray-50 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (stuckJobs.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-extrabold text-[#111827]">SLA Compliance</h3>
                        <p className="text-sm font-bold text-emerald-600">All workflow queues active and within thresholds</p>
                    </div>
                </div>
                <div className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Operational
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${criticalJobs.length > 0 ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-extrabold text-[#111827]">SLA Monitoring</h3>
                            <p className="text-[10px] font-black text-[#64748b] uppercase tracking-widest">{stuckJobs.length} Alerts Detected</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="btn btn-secondary border-none bg-gray-50 text-primary-600 font-black text-[10px] uppercase tracking-widest hover:bg-primary-50"
                    >
                        {expanded ? 'Collapse' : 'Inspect All'}
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#fff1f2] border border-red-100 rounded-2xl p-5">
                        <p className="text-[10px] font-black text-red-800 uppercase tracking-widest mb-1">Critical</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-red-700">{criticalJobs.length}</span>
                            <span className="text-xs font-bold text-red-600/60">&gt; 48h Drift</span>
                        </div>
                    </div>
                    <div className="bg-[#fffbeb] border border-amber-100 rounded-2xl p-5">
                        <p className="text-[10px] font-black text-amber-800 uppercase tracking-widest mb-1">Warning</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-amber-700">{warningJobs.length}</span>
                            <span className="text-xs font-bold text-amber-600/60">SLA Triggered</span>
                        </div>
                    </div>
                </div>

                {/* Expanded List */}
                {expanded && (
                    <div className="mt-8 pt-8 border-t border-gray-50 space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {stuckJobs.map((job) => (
                            <div
                                key={job.id}
                                className={`p-4 rounded-xl border border-l-4 transition-all hover:translate-x-1 ${job.severity === 'critical'
                                    ? 'bg-red-50/30 border-red-100 border-l-red-500'
                                    : 'bg-amber-50/30 border-amber-100 border-l-amber-500'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[10px] font-black text-gray-900 tracking-tight">{job.claim_id}</span>
                                            <span className="px-2 py-0.5 bg-white border border-gray-100 rounded text-[9px] font-black text-gray-500 uppercase">
                                                {job.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-700 mb-2">{job.patient_name}</p>
                                        <div className="flex items-center gap-4 text-[10px] font-black text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                DRIFT: {job.days_stuck}d {job.hours_stuck % 24}h
                                            </span>
                                            <span className="flex items-center gap-1 uppercase tracking-widest">
                                                <Users className="w-3 h-3" />
                                                {job.current_role?.replace('_', ' ')} QUEUE
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-black text-gray-900">${parseFloat(job.claim_amount).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StuckJobsWidget;
