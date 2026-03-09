import React, { useState, useEffect } from 'react';
import { jobService } from '../../services/api';
import {
    AlertCircle,
    CheckCircle,
    Clock,
    RefreshCw,
    FileEdit,
    Send,
    Search,
    LayoutGrid,
    List,
    User,
    Activity,
    ChevronRight,
    ExternalLink,
    Layers,
    ArrowRight,
    PauseCircle,
    ShieldAlert,
    X
} from 'lucide-react';
import JobDetailModal from '../../components/JobDetailModal';
import NexalithLogo from '../../components/NexalithLogo';

const BillingDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [processingJobId, setProcessingJobId] = useState(null);
    const [actionType, setActionType] = useState(null);
    const [reasonValue, setReasonValue] = useState('');

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await jobService.getJobs();
            setJobs(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching jobs", err);
            setError("The billing sequence could not be retrieved. Network failure.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleAction = async (jobId, type) => {
        try {
            if (type === 'submit') {
                await jobService.submitJob(jobId);
            } else if (type === 'hold') {
                if (!reasonValue.trim()) return;
                await jobService.hold(jobId, reasonValue);
            } else if (type === 'escalate') {
                if (!reasonValue.trim()) return;
                await jobService.escalate(jobId, reasonValue);
            }

            setProcessingJobId(null);
            setActionType(null);
            setReasonValue('');
            fetchJobs();
        } catch (err) {
            console.error("Action failed", err);
        }
    };

    const filteredJobs = jobs.filter(job =>
        job.claim_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-12 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
                <div>
                    <h2 className="text-4xl font-black text-[#111827] mb-2 tracking-tight">Billing Workspace</h2>
                    <div className="flex items-center gap-4">
                        <div className="clinical-badge bg-primary-50 text-primary-500 border-primary-100 py-1.5 px-3">
                            <NexalithLogo size={0.2} variant="iconOnly" className="mr-1" />
                            Clinical Pulse Active
                        </div>
                        <div className="h-4 w-[1px] bg-gray-200"></div>
                        <p className="text-sm font-bold text-[#64748b]">{jobs.length} Active Operational Signals Received</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button onClick={fetchJobs} className="btn btn-primary px-8 flex items-center gap-2">
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                        Synchronize Node
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-6 bg-rose-50 text-rose-700 rounded-3xl border border-rose-100 flex items-center gap-4 animate-shake">
                    <AlertCircle className="w-6 h-6" />
                    <p className="font-bold">{error}</p>
                </div>
            )}

            {/* Operational Heartbeat Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="stat-card">
                    <p className="subtle-label">Draft Manifests</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-gray-900 tracking-tight">{jobs.filter(j => j.status === 'draft').length}</span>
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shadow-sm">
                            <FileEdit size={20} />
                        </div>
                    </div>
                </div>
                <div className="stat-card">
                    <p className="subtle-label">Returns/Rejected</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-gray-900 tracking-tight">{jobs.filter(j => j.status === 'rejected').length}</span>
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shadow-sm">
                            <AlertCircle size={20} />
                        </div>
                    </div>
                </div>
                <div className="stat-card">
                    <p className="subtle-label">Low Priority</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-gray-900 tracking-tight">{jobs.filter(j => j.priority === 'low').length}</span>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-sm">
                            <CheckCircle size={20} />
                        </div>
                    </div>
                </div>
                <div className="stat-card">
                    <p className="subtle-label">System Fluidity</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-gray-900 tracking-tight">94.2%</span>
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-500 flex items-center justify-center shadow-sm">
                            <NexalithLogo size={0.3} variant="iconOnly" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Command Workspace */}
            <div className="medical-card overflow-hidden">
                <div className="p-8 border-b border-gray-50 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <Layers className="text-primary-500" size={20} />
                        <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest">Billing Sequence Queue</h3>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Interrogate Claim ID..."
                            className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all w-64 shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="clinical-table">
                        <thead>
                            <tr>
                                <th>Claim Sequence</th>
                                <th>Biological Entity</th>
                                <th>Operational Origin</th>
                                <th>Exposure</th>
                                <th>Signal Status</th>
                                <th className="text-right">Tactical Response</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
                                            <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Synchronizing Workspace...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredJobs.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-4 opacity-40">
                                            <Activity size={48} className="text-gray-300" />
                                            <p className="text-sm font-black text-gray-400 uppercase tracking-widest">No Sequences Detected</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredJobs.map((job) => (
                                    <tr key={job.id} className="group">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-500 group-hover:text-white transition-all">
                                                    <Activity size={14} />
                                                </div>
                                                <span className="text-sm font-black text-gray-900 leading-none">{job.claim_id}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-500">
                                                    <User size={14} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-700 leading-none mb-1">{job.patient_name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PID: {job.patient_id || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{job.insurance_provider || 'FEDERAL PAYER'}</span>
                                        </td>
                                        <td>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-gray-900">${parseFloat(job.claim_amount).toLocaleString()}</span>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest tracking-tighter">Gross Potential</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={`clinical-badge ${job.status === 'draft' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                job.status === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                    'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${job.status === 'draft' ? 'bg-blue-500' :
                                                    job.status === 'rejected' ? 'bg-rose-500' :
                                                        'bg-emerald-500'
                                                    } animate-pulse`}></div>
                                                {job.status.toUpperCase()}
                                            </div>
                                        </td>
                                        <td className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {job.status === 'draft' || job.status === 'rejected' ? (
                                                    <button
                                                        onClick={() => handleAction(job.id, 'submit')}
                                                        className="h-10 px-4 flex items-center gap-2 bg-primary-50 text-primary-600 rounded-xl hover:bg-primary-500 hover:text-white transition-all border border-primary-100 font-black text-[10px] uppercase tracking-widest"
                                                    >
                                                        <Send size={14} /> Submit
                                                    </button>
                                                ) : (
                                                    <div className="h-10 px-4 flex items-center gap-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 font-black text-[10px] uppercase tracking-widest cursor-default">
                                                        <CheckCircle size={14} /> Processed
                                                    </div>
                                                )}

                                                {(job.status === 'draft' || job.status === 'rejected') && (
                                                    <>
                                                        <button
                                                            onClick={() => { setProcessingJobId(job.id); setActionType('hold'); }}
                                                            className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 rounded-xl hover:bg-amber-500 hover:text-white transition-all border border-gray-100"
                                                            title="Put on Hold"
                                                        >
                                                            <PauseCircle size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => { setProcessingJobId(job.id); setActionType('escalate'); }}
                                                            className="w-10 h-10 flex items-center justify-center bg-gray-50 text-rose-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all border border-gray-100"
                                                            title="Escalate to Manager"
                                                        >
                                                            <ShieldAlert size={16} />
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => setSelectedJob(job)}
                                                    className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 hover:bg-white hover:text-primary-500 rounded-xl transition-all border border-gray-100"
                                                >
                                                    <ArrowRight size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tactical Modals */}
            {processingJobId && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-primary-900/40 backdrop-blur-md animate-fade-in">
                    <div className="medical-card w-full max-w-xl p-10 shadow-2xl animate-scale-up">
                        <div className="flex items-center gap-4 mb-8">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${actionType === 'hold' ? 'bg-amber-600' : 'bg-rose-600'
                                }`}>
                                {actionType === 'hold' ? <PauseCircle size={24} /> : <ShieldAlert size={24} />}
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                                    {actionType === 'hold' ? 'Suspend Procedure (Hold)' : 'Escalate Trace to Management'}
                                </h3>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Operational ID: {processingJobId}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="subtle-label">Clinical Intelligence / Justification</label>
                                <textarea
                                    className="w-full px-6 py-4 bg-gray-50 border-gray-100 rounded-2xl font-bold text-gray-700 min-h-[120px] focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                                    placeholder="Provide detailed reasoning for this tactical adjustment..."
                                    value={reasonValue}
                                    onChange={(e) => setReasonValue(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() => handleAction(processingJobId, actionType)}
                                    className="btn btn-primary flex-1 py-4"
                                >
                                    Confirm Execution Trace
                                </button>
                                <button
                                    onClick={() => { setProcessingJobId(null); setActionType(null); setReasonValue(''); }}
                                    className="btn btn-secondary px-10"
                                >
                                    Abort
                                </button>
                            </div>
                        </div>
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

export default BillingDashboard;
