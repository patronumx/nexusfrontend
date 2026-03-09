import React, { useState } from 'react';
import {
    Upload,
    FileSpreadsheet,
    CheckCircle,
    AlertCircle,
    X,
    CloudUpload,
    Layers,
    Activity,
    ChevronRight
} from 'lucide-react';
import { jobService } from '../../services/api';
import ClearinghouseQueue from '../../components/ClearinghouseQueue';
import StuckJobsWidget from '../../components/StuckJobsWidget';
import EscalatedJobsQueue from '../../components/EscalatedJobsQueue';
import NexalithLogo from '../../components/NexalithLogo';

const OperationsManagerDashboard = () => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (file) => {
        const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv'];
        if (validTypes.includes(file.type) || file.name.endsWith('.xlsx')) {
            setFile(file);
            setUploadStatus(null);
        } else {
            setUploadStatus({
                type: 'error',
                message: 'Incompatible Protocol. Please provide a validated Excel (.xlsx) file.'
            });
        }
    };

    const removeFile = () => {
        setFile(null);
        setUploadStatus(null);
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        setUploadStatus(null);

        try {
            const response = await jobService.uploadJobs(file);
            setUploadStatus({
                type: 'success',
                message: `Manifest Processed. Node-Delta: ${response.data.message}`,
                details: response.data.warnings || []
            });
            setFile(null);
        } catch (error) {
            const errorMsg = error.response?.data?.error || "Signal Interruption. Verification failed.";
            setUploadStatus({ type: 'error', message: errorMsg });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-16 animate-fade-in max-w-[1600px] mx-auto">
            {/* Clinical Command Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-10 border-b border-slate-100">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                            <Layers size={24} />
                        </div>
                        <h2 className="text-5xl font-black text-slate-950 tracking-tighter">Operations Command</h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="clinical-badge bg-primary-50 text-primary-600 border-primary-100 py-2 px-4 shadow-sm">
                            <NexalithLogo size={0.18} variant="iconOnly" className="mr-2" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Master Node: Administrator</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
                                Managing: <span className="text-slate-900">12 Primary Staff Nodes</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
                    <div className="px-6 py-2.5 bg-white rounded-xl shadow-sm text-[10px] font-black text-primary-600 uppercase tracking-widest">
                        Real-Time Telemetry
                    </div>
                </div>
            </div>

            {/* High-Impact Stat Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Network Signals', val: '1,284', icon: <Activity />, color: 'primary' },
                    { label: 'Ingestion Delta', val: '98.4%', icon: <CloudUpload />, color: 'emerald' },
                    { label: 'Node Latency', val: '0.8s', icon: <Layers />, color: 'amber' },
                    { label: 'Processor Load', val: '14%', icon: <Activity />, color: 'blue' }
                ].map((stat, i) => (
                    <div key={i} className="stat-card group hover:scale-[1.02] transition-all duration-500">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">{stat.label}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-4xl font-black text-slate-950 tracking-tighter">{stat.val}</span>
                            <div className={`w-14 h-14 rounded-3xl bg-${stat.color === 'primary' ? 'primary' : stat.color}-50 text-${stat.color === 'primary' ? 'primary' : stat.color}-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Core Ingestion Interface */}
                <div className="lg:col-span-2 space-y-12">
                    <div className="bg-white rounded-[3.5rem] p-12 shadow-medical-md border border-slate-50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 blur-[100px] rounded-full -mr-48 -mt-48 transition-transform duration-1000 group-hover:scale-125"></div>

                        <div className="flex items-center gap-6 mb-12 relative z-10">
                            <div className="w-16 h-16 bg-slate-950 text-white rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-700">
                                <FileSpreadsheet size={32} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-slate-950 tracking-tight">Ingestion Terminal</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1.5">Sequential Data Deployment Center</p>
                            </div>
                        </div>

                        <div
                            className={`relative border-3 border-dashed rounded-[3rem] p-24 transition-all duration-700 group/drop ${dragActive
                                ? 'border-primary-500 bg-primary-50/30 scale-[0.98]'
                                : 'border-slate-100 bg-slate-50/30 hover:border-primary-200 hover:bg-slate-50/50'
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            {!file ? (
                                <div className="text-center relative z-10">
                                    <div className="w-28 h-28 bg-white rounded-4xl flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-slate-200/50 group-hover/drop:scale-110 transition-transform duration-700">
                                        <CloudUpload size={56} className="text-primary-500" />
                                    </div>
                                    <h4 className="text-2xl font-black text-slate-950 mb-4 tracking-tight">Deploy Manifest</h4>
                                    <p className="text-sm font-medium text-slate-500 mb-12 max-w-sm mx-auto leading-relaxed">
                                        Drag & drop your clinical manifest or initialize the local repository browse.
                                    </p>
                                    <input
                                        type="file"
                                        id="file-upload"
                                        className="hidden"
                                        accept=".xlsx, .xls"
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="inline-flex h-16 items-center px-12 bg-slate-950 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-slate-900 transition-all cursor-pointer shadow-xl shadow-slate-950/20 active:scale-95"
                                    >
                                        Browse Data Nodes
                                    </label>
                                </div>
                            ) : (
                                <div className="animate-fade-in relative z-10">
                                    <div className="p-10 bg-white rounded-4xl border border-primary-100 shadow-2xl flex items-center justify-between group/file">
                                        <div className="flex items-center gap-8">
                                            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center shadow-inner group-hover/file:scale-110 transition-transform">
                                                <FileSpreadsheet size={32} />
                                            </div>
                                            <div>
                                                <p className="text-xl font-black text-slate-950 tracking-tight mb-1">{file.name}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{(file.size / 1024).toFixed(2)} KB • Initialized</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={removeFile}
                                            className="w-14 h-14 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <div className="mt-12 flex gap-6">
                                        <button
                                            onClick={handleUpload}
                                            disabled={uploading}
                                            className="flex-1 h-18 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] transition-all shadow-xl shadow-primary-500/20 flex items-center justify-center gap-4 disabled:opacity-50"
                                        >
                                            {uploading ? (
                                                <>
                                                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    Ingesting Stream...
                                                </>
                                            ) : (
                                                <>
                                                    Engage Full Sync
                                                    <ChevronRight size={20} />
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={removeFile}
                                            disabled={uploading}
                                            className="px-12 h-18 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all"
                                        >
                                            Abort
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {uploadStatus && (
                            <div className={`mt-10 p-8 rounded-[2.5rem] border-2 flex items-center gap-6 animate-slide-up ${uploadStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm ${uploadStatus.type === 'success' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {uploadStatus.type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
                                </div>
                                <p className="text-sm font-black uppercase tracking-wide">{uploadStatus.message}</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-[3.5rem] shadow-medical-md border border-slate-50 overflow-hidden">
                        <div className="p-10 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center shadow-lg">
                                    <Activity size={20} />
                                </div>
                                <h3 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.4em]">Clearinghouse Sequence</h3>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-100 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-[9px] font-black text-slate-900 tracking-widest uppercase">Live Link</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <ClearinghouseQueue />
                        </div>
                    </div>

                    <div className="bg-white rounded-[3.5rem] shadow-medical-md border border-rose-100 overflow-hidden grayscale-[0.5] hover:grayscale-0 transition-all duration-700">
                        <div className="p-10 border-b border-rose-50 bg-rose-50/20 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-lg">
                                    <AlertCircle size={20} />
                                </div>
                                <h3 className="text-[11px] font-black text-rose-950 uppercase tracking-[0.4em]">Escalated Resolution Nodes</h3>
                            </div>
                            <div className="px-4 py-2 bg-rose-500 text-white rounded-full shadow-lg shadow-rose-900/20">
                                <span className="text-[8px] font-black tracking-[0.3em] uppercase">High Priority Interception</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <EscalatedJobsQueue />
                        </div>
                    </div>
                </div>

                {/* Intelligence & Alert Matrix */}
                <div className="space-y-12">
                    <div className="bg-white rounded-[3.5rem] p-10 shadow-medical-md border border-slate-50">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-lg">
                                <Layers size={20} />
                            </div>
                            <h3 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.3em]">SLA Thresholds</h3>
                        </div>
                        <StuckJobsWidget />
                    </div>

                    <div className="bg-slate-950 rounded-[3.5rem] p-12 text-white shadow-3xl shadow-slate-950/40 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/10 blur-[100px] rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000"></div>

                        <div className="relative z-10">
                            <h4 className="text-[10px] font-black text-primary-500 uppercase tracking-[0.4em] mb-6">Autonomous Intelligence</h4>
                            <p className="text-3xl font-black leading-[1.1] mb-12 tracking-tight">
                                AI-Driven Workflow Optimization <span className="text-slate-600">Active</span>
                            </p>

                            <div className="space-y-8">
                                {[
                                    { label: 'Neural Routing', status: 'Optimized', color: 'emerald' },
                                    { label: 'Anomaly Watch', status: 'Scanning', color: 'primary' },
                                    { label: 'Payer Prediction', status: 'High Confidence', color: 'blue' }
                                ].map((item, idx) => (
                                    <div key={idx} className="group/item pb-6 border-b border-white/5 last:border-0 last:pb-0">
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 group-hover/item:text-slate-300 transition-colors">{item.label}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold tracking-wide">{item.status}</span>
                                            <div className={`w-2 h-2 rounded-full bg-${item.color === 'primary' ? 'primary' : item.color}-500 shadow-glow`}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-12 h-14 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all">
                                Neural Logs Access
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OperationsManagerDashboard;
