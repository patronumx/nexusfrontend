import React from 'react';
import {
    X,
    Clock,
    User,
    FileText,
    Activity,
    DollarSign,
    Calendar,
    Building2,
    CheckCircle2,
    AlertCircle,
    Hash,
    ArrowRight,
    ShieldCheck,
    CreditCard,
    History,
    ClipboardList,
    Layers
} from 'lucide-react';

const JobDetailModal = ({ job, isOpen, onClose }) => {
    if (!job || !isOpen) return null;

    const getStatusTheme = (status) => {
        const themes = {
            'draft': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', dot: 'bg-blue-500' },
            'submitted': { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', dot: 'bg-indigo-500' },
            'accepted': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', dot: 'bg-emerald-500' },
            'rejected': { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', dot: 'bg-rose-500' },
            'paid_full': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', dot: 'bg-emerald-500' },
            'paid_partial': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', dot: 'bg-amber-500' },
            'denied': { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', dot: 'bg-rose-500' },
            'written_off': { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100', dot: 'bg-slate-500' },
            'on_hold': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', dot: 'bg-amber-500' },
            'escalated': { bg: 'bg-primary-500', text: 'text-white', border: 'border-primary-600', dot: 'bg-white' },
            'closed': { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-400' }
        };
        return themes[status] || themes['draft'];
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const theme = getStatusTheme(job.status);
    const balance = job.payment_amount
        ? (parseFloat(job.claim_amount) - parseFloat(job.payment_amount)).toFixed(2)
        : parseFloat(job.claim_amount).toFixed(2);

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-xl animate-fade-in">
            <div className="bg-white rounded-[3rem] shadow-2xl max-w-6xl w-full max-h-[92vh] overflow-hidden flex flex-col border border-white/20 animate-slide-up">

                {/* Cyber-Clinical Header */}
                <div className="bg-slate-50/50 border-b border-slate-100 p-10 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${theme.bg} ${theme.text} border ${theme.border} shadow-xl shadow-slate-900/5 group`}>
                            <Activity size={36} className="group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                            <div className="flex items-center gap-5 mb-3">
                                <h2 className="text-4xl font-black text-slate-950 tracking-tighter truncate max-w-md">Case: #{job.claim_id}</h2>
                                <div className={`clinical-badge px-5 py-2 ${theme.bg} ${theme.text} ${theme.border} shadow-sm`}>
                                    <div className={`w-2 h-2 rounded-full ${theme.dot} animate-pulse mr-1`}></div>
                                    <span className="text-[10px] font-black tracking-[0.2em]">{job.status.replace('_', ' ')}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-8">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] flex items-center gap-2.5">
                                    <Calendar size={16} className="text-primary-500" />
                                    Initialized: {formatDate(job.created_at)}
                                </p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] flex items-center gap-2.5">
                                    <Hash size={16} className="text-primary-500" />
                                    Node-ID: {job.id}
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-14 h-14 flex items-center justify-center bg-white border border-slate-100 rounded-[2rem] text-slate-300 hover:text-primary-500 hover:border-primary-100 transition-all shadow-sm group"
                    >
                        <X size={28} className="group-hover:rotate-90 transition-transform duration-500" />
                    </button>
                </div>

                {/* Analytical Intelligence Workspace */}
                <div className="flex-1 overflow-y-auto p-12 space-y-16 scrollbar-hide">

                    {/* High-Velocity Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Patient Entity', icon: <User />, val: job.patient_name, sub: `ID: ${job.patient_id || 'N/A'}`, color: 'primary' },
                            { label: 'Claim Exposure', icon: <DollarSign />, val: `$${parseFloat(job.claim_amount).toLocaleString()}`, sub: 'Raw Revenue', color: 'slate' },
                            { label: 'Settlement Post', icon: <CreditCard />, val: `$${parseFloat(job.payment_amount || 0).toLocaleString()}`, sub: 'Liquid Capital', color: 'emerald' },
                            { label: 'Residual Δ', icon: <Activity />, val: `$${balance}`, sub: 'Outstanding', color: 'primary' }
                        ].map((stat, i) => (
                            <div key={i} className="group p-8 bg-white border border-slate-50 rounded-[2.5rem] shadow-sm hover:shadow-medical-md hover:border-primary-100 transition-all duration-500">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">{stat.label}</p>
                                <div className="flex items-center gap-5">
                                    <div className={`w-14 h-14 rounded-2xl bg-${stat.color === 'slate' ? 'slate' : 'primary'}-50 text-${stat.color === 'slate' ? 'slate' : 'primary'}-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                                        {React.cloneElement(stat.icon, { size: 24 })}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-2xl font-black text-slate-950 tracking-tight truncate">{stat.val}</p>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.sub}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Core Intelligence Segments */}
                        <div className="lg:col-span-2 space-y-16">
                            <section className="animate-fade-in">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                                        <ClipboardList size={20} />
                                    </div>
                                    <h3 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.3em]">Procedural Architecture</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-slate-50/50 p-10 rounded-[3rem] border border-slate-100">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Primary Payer Entity</p>
                                        <div className="p-4 bg-white rounded-2xl border border-slate-100 font-bold text-slate-900 shadow-sm uppercase tracking-wide">
                                            {job.insurance_provider || 'FEDERAL COVERAGE'}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Execution Priority</p>
                                        <div className={`p-4 rounded-2xl border font-black text-center shadow-sm uppercase tracking-widest ${job.priority === 'urgent' ? 'bg-primary-50 text-primary-600 border-primary-100' :
                                                job.priority === 'medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                    'bg-emerald-50 text-emerald-600 border-emerald-100'
                                            }`}>
                                            {job.priority || 'NORMAL'} Deployment
                                        </div>
                                    </div>
                                    <div className="space-y-2 col-span-full">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Operational Narratives</p>
                                        <div className="text-sm font-medium text-slate-600 leading-relaxed bg-white/80 p-8 rounded-2xl border border-slate-100 shadow-inner min-h-[120px]">
                                            {job.description || 'No specialized procedural narratives identified for this operational node.'}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {job.metadata && Object.keys(job.metadata).length > 0 && (
                                <section className="animate-fade-in">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center shadow-lg">
                                            <Layers size={20} />
                                        </div>
                                        <h3 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.3em]">Synapse Registry (Metadata)</h3>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 bg-slate-900 p-10 rounded-[3rem] shadow-xl shadow-slate-950/20 group">
                                        {Object.entries(job.metadata).map(([key, value]) => (
                                            <div key={key} className="space-y-2 group/item">
                                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] group-hover/item:text-primary-400 transition-colors">{key.replace(/_/g, ' ')}</p>
                                                <p className="text-xs font-bold text-white tracking-wide truncate opacity-80" title={String(value)}>{String(value)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {(job.denial_reason || job.close_reason) && (
                                <section className="animate-fade-in">
                                    <div className="p-10 bg-rose-50 border-2 border-rose-100 rounded-[3rem] flex gap-8 items-start relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/20 blur-3xl rounded-full"></div>
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-md group-hover:bg-rose-500 group-hover:text-white transition-all duration-500">
                                            <AlertCircle size={32} />
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <h4 className="text-[11px] font-black text-rose-600 uppercase tracking-[0.3em]">Critical Signal Interruption</h4>
                                            <p className="text-lg font-black text-rose-950 leading-snug">
                                                "{job.denial_reason || job.close_reason}"
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Audit & Telemetry Sidebar */}
                        <div className="space-y-12">
                            <div className="medical-card p-10 bg-slate-50 border-slate-200">
                                <div className="flex items-center gap-4 mb-10">
                                    <History className="text-primary-500" size={24} />
                                    <h3 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.3em]">Operational Chronology</h3>
                                </div>
                                <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                                    {job.history && job.history.length > 0 ? (
                                        job.history.map((h, i) => (
                                            <TimelineItem
                                                key={h.id}
                                                status={h.action}
                                                date={h.timestamp}
                                                desc={h.notes}
                                                user={h.user_name}
                                                active={i === 0}
                                                last={i === job.history.length - 1}
                                            />
                                        ))
                                    ) : (
                                        <TimelineItem
                                            status="Case Initialized"
                                            date={job.created_at}
                                            active={true}
                                            last={true}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Velocity Metrics */}
                            <div className="medical-card p-10 bg-slate-950 text-white border-slate-900 group">
                                <div className="flex items-center gap-4 mb-10">
                                    <Clock className="text-primary-500" size={24} />
                                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-white transition-colors">Queue Telemetry</h3>
                                </div>
                                <div className="space-y-8">
                                    {job.time_tracks && job.time_tracks.length > 0 ? (
                                        job.time_tracks.map((track) => (
                                            <div key={track.id} className="flex items-center justify-between group/track">
                                                <div>
                                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary-500 mb-1 group-hover/track:text-white transition-colors">{track.status.replace(/_/g, ' ')}</p>
                                                    <p className="text-[9px] text-slate-600 font-bold">{formatDate(track.entered_at)}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-black tracking-tight text-white mb-0.5">
                                                        {track.duration_seconds
                                                            ? `${Math.floor(track.duration_seconds / 60)}m ${track.duration_seconds % 60}s`
                                                            : 'LIVE'}
                                                    </p>
                                                    <div className="inline-flex items-center gap-1">
                                                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                                                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Efficiency</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-xs font-bold text-slate-600 italic">Streaming initialization...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Orchestration */}
                <div className="p-10 bg-slate-50/50 border-t border-slate-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="btn btn-secondary px-12 py-4 bg-slate-950 text-white rounded-[2rem] hover:bg-slate-900 transition-all font-black uppercase tracking-[0.3em] flex items-center gap-4 group shadow-xl shadow-slate-950/20"
                    >
                        Synchronize & Exit
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const TimelineItem = ({ status, date, active, last, desc, user }) => (
    <div className={`relative pl-12 ${last ? '' : 'pb-4'}`}>
        <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center z-10 ${active ? 'bg-primary-500 animate-pulse' : 'bg-slate-300'}`}>
            {active && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
        </div>
        <div className="group/item">
            <div className="flex items-center justify-between gap-4 mb-2">
                <p className={`text-[10px] font-black ${active ? 'text-slate-950' : 'text-slate-400'} uppercase tracking-[0.2em]`}>{status}</p>
                {user && <p className="text-[8px] font-black bg-slate-200 text-slate-500 px-3 py-1 rounded-full uppercase tracking-tighter group-hover/item:bg-primary-500 group-hover/item:text-white transition-colors">{user}</p>}
            </div>
            {date && <p className="text-[9px] font-bold text-slate-400 mb-2">{new Date(date).toLocaleString()}</p>}
            {desc && <p className="text-xs font-medium text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group-hover/item:shadow-md transition-shadow">{desc}</p>}
        </div>
    </div>
);

export default JobDetailModal;
