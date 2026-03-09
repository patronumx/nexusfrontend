import React, { useState, useEffect } from 'react';
import { jobService } from '../services/api';
import {
    CheckCircle,
    AlertCircle,
    RefreshCw,
    ExternalLink,
    Search,
    Filter,
    Check,
    X,
    CreditCard,
    User,
    ShieldCheck
} from 'lucide-react';
import JobDetailModal from './JobDetailModal';

const ClearinghouseQueue = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rejectingJobId, setRejectingJobId] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await jobService.getJobs({ status: 'submitted' });
            setJobs(response.data);
        } catch (err) {
            console.error("Error fetching clearinghouse jobs", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleAccept = async (jobId) => {
        try {
            await jobService.acceptJob(jobId);
            fetchJobs();
        } catch (err) {
            console.error("Accept failed", err);
        }
    };

    const handleReject = async (jobId) => {
        if (!rejectReason.trim()) return;
        try {
            await jobService.rejectJob(jobId, rejectReason);
            setRejectingJobId(null);
            setRejectReason('');
            fetchJobs();
        } catch (err) {
            console.error("Reject failed", err);
        }
    };

    const filteredJobs = jobs.filter(job =>
        job.claim_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            {/* Table Header */}
            <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                            <ShieldCheck size={20} />
                        </div>
                        <h3 className="text-xl font-black text-[#111827]">Bridge Review Queue</h3>
                    </div>
                    <p className="text-xs font-bold text-[#64748b] uppercase tracking-widest opacity-70">Clearinghouse Synchronization Space</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Filter by Claim ID or Patient..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-11 pr-6 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium w-[300px] focus:ring-2 focus:ring-primary-500/10 transition-all"
                        />
                    </div>
                    <button
                        onClick={fetchJobs}
                        className={`p-2.5 bg-gray-50 rounded-xl text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-all ${loading ? 'animate-spin' : ''}`}
                    >
                        <RefreshCw size={20} />
                    </button>
                    <button className="btn btn-secondary p-2.5 bg-gray-50 border-none rounded-xl text-gray-500">
                        <Filter size={20} />
                    </button>
                </div>
            </div>
            {loading ? (
                <div className="p-32 flex flex-col items-center justify-center text-gray-400 gap-4">
                    <div className="w-12 h-12 border-4 border-primary-50 border-t-primary-600 rounded-full animate-spin"></div>
                    <p className="text-xs font-black uppercase tracking-widest">Scanning Network...</p>
                </div>
            ) : filteredJobs.length === 0 ? (
                <div className="p-32 text-center text-gray-400 flex flex-col items-center animate-fade-in">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                        <Check size={40} />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">Workspace Synchronized</h3>
                    <p className="text-sm font-medium">All submitted claims have been processed or are in distribution.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#f8fafb]">
                                <th className="px-8 py-5 text-[10px] font-black text-[#64748b] uppercase tracking-widest border-b border-gray-100">Reference</th>
                                <th className="px-8 py-5 text-[10px] font-black text-[#64748b] uppercase tracking-widest border-b border-gray-100">Patient Metadata</th>
                                <th className="px-8 py-5 text-[10px] font-black text-[#64748b] uppercase tracking-widest border-b border-gray-100">Payer Signal</th>
                                <th className="px-8 py-5 text-[10px] font-black text-[#64748b] uppercase tracking-widest border-b border-gray-100">Requested Amount</th>
                                <th className="px-8 py-5 text-[10px] font-black text-[#64748b] uppercase tracking-widest border-b border-gray-100">Priority</th>
                                <th className="px-8 py-5 text-[10px] font-black text-[#64748b] uppercase tracking-widest border-b border-gray-100 text-right pr-12">Authorization</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredJobs.map((job) => (
                                <tr key={job.id} className="group hover:bg-primary-50/30 transition-all duration-300">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-primary-600 transition-colors">
                                                <CreditCard size={14} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900 leading-none mb-1.5">{job.claim_id}</p>
                                                <button
                                                    onClick={() => setSelectedJob(job)}
                                                    className="flex items-center gap-1.5 text-[10px] font-black text-primary-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all hover:underline"
                                                >
                                                    View Details <ExternalLink size={10} />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-primary-600 transition-colors">
                                                <User size={14} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-800 leading-none mb-1.5">{job.patient_name}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID: {job.patient_id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-bold text-gray-600">{job.insurance_provider}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-black text-gray-900">${parseFloat(job.claim_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${job.priority === 'urgent' ? 'bg-red-50 text-red-600' :
                                            job.priority === 'high' ? 'bg-amber-50 text-amber-600' :
                                                'bg-primary-50 text-primary-600'
                                            }`}>
                                            <div className={`w-1 h-1 rounded-full ${job.priority === 'urgent' ? 'bg-red-600' :
                                                job.priority === 'high' ? 'bg-amber-600' :
                                                    'bg-primary-600'
                                                }`}></div>
                                            {job.priority}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right pr-8">
                                        {rejectingJobId === job.id ? (
                                            <div className="flex items-center justify-end gap-2 animate-fade-in">
                                                <input
                                                    type="text"
                                                    placeholder="Reason..."
                                                    autoFocus
                                                    value={rejectReason}
                                                    onChange={(e) => setRejectReason(e.target.value)}
                                                    className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold w-32 focus:ring-1 focus:ring-red-500/20"
                                                />
                                                <button
                                                    onClick={() => handleReject(job.id)}
                                                    className="w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-lg shadow-red-900/20"
                                                >
                                                    <Check size={16} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setRejectingJobId(null);
                                                        setRejectReason('');
                                                    }}
                                                    className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleAccept(job.id)}
                                                    className="px-4 py-2 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-100/50"
                                                >
                                                    Authorize
                                                </button>
                                                <button
                                                    onClick={() => setRejectingJobId(job.id)}
                                                    className="px-4 py-2 bg-red-50 text-red-700 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-100 transition-colors border border-red-100/50"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedJob && (
                <JobDetailModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}
        </div>
    );
};

export default ClearinghouseQueue;
