import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Shield,
    Activity,
    BarChart,
    FileText,
    Zap,
    Users,
    ArrowRight,
    Database,
    Lock,
    ShieldCheck,
    Globe,
    Cpu,
    ArrowUpRight,
    TrendingUp
} from 'lucide-react';
import mockup from '../assets/nexalith_mockup.png';
import NexalithLogo from '../components/NexalithLogo';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-bg-main font-sans overflow-x-hidden selection:bg-primary-100 selection:text-primary-900">
            {/* Immersive Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[45%] bg-primary-500/8 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '15s' }}></div>
                <div className="absolute bottom-[10%] left-[-5%] w-[35%] h-[35%] bg-accent-500/5 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '20s' }}></div>
                <div className="absolute inset-0 background-grid opacity-[0.08]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-white"></div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-3xl border-b border-primary-100/20">
                <div className="max-w-[1600px] mx-auto px-12 h-24 flex items-center justify-between">
                    <div className="flex items-center cursor-pointer group" onClick={() => navigate('/')}>
                        <NexalithLogo size={0.85} theme="light" />
                    </div>

                    <div className="hidden lg:flex items-center gap-16">
                        {['Infrastructure', 'Protocols', 'Intelligence', 'Security'].map((item) => (
                            <a key={item} href="#" className="text-[13px] font-black text-slate-700 uppercase tracking-[0.25em] hover:text-primary-600 transition-all duration-300 relative group/link">
                                {item}
                                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover/link:w-full"></span>
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-8">
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-primary-500 hover:bg-primary-600 text-white px-12 py-4 rounded-2xl font-black tracking-[0.2em] text-[12px] uppercase shadow-lg shadow-primary-500/25 transition-all active:scale-95"
                        >
                            Portal Access
                        </button>
                    </div>
                </div>
            </nav>

            <main className="pt-64 pb-48">
                {/* Hero section */}
                <div className="max-w-[1600px] mx-auto px-12">
                    <div className="text-center space-y-14 mb-48">
                        <div className="inline-flex items-center gap-4 px-6 py-3 bg-white shadow-medical-md text-slate-950 rounded-full border border-primary-100 animate-fade-in group hover:bg-primary-50 transition-all duration-500">
                            <div className="relative">
                                <div className="w-3 h-3 rounded-full bg-accent-500 animate-ping absolute inset-0"></div>
                                <div className="w-3 h-3 rounded-full bg-accent-500 relative"></div>
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-800">Nexus-Portal Protocol Alpha v9.8 ACTIVE</span>
                        </div>

                        <h1 className="text-[6rem] md:text-[11rem] font-black text-slate-950 tracking-[-0.07em] leading-[0.75] animate-slide-up">
                            Clinical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 drop-shadow-sm">Intelligence</span> <br />
                            <span className="relative inline-block mt-6">
                                orchestrated
                                <div className="absolute -bottom-8 left-0 right-0 h-4 bg-primary-500/5 rounded-full blur-xl scale-x-95"></div>
                            </span>
                        </h1>

                        <p className="max-w-4xl mx-auto text-2xl md:text-3xl text-slate-700 font-bold leading-relaxed animate-slide-up opacity-0 tracking-tight" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                            Advanced RCM orchestrations for high-complexity healthcare deployments. <br />
                            <span className="text-primary-600">Nexalith Portal</span> synchronizes clinical data with capital trajectory.
                        </p>

                        <div className="flex flex-wrap justify-center gap-10 pt-16 animate-slide-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                            <button
                                onClick={() => navigate('/login')}
                                className="btn btn-primary px-20 py-8 text-[14px] group rounded-[3rem] shadow-glow"
                            >
                                Deployment Portal
                                <ArrowRight size={22} className="group-hover:translate-x-3 transition-transform" />
                            </button>
                            <button className="btn btn-outline px-20 py-8 text-[14px] border-2 border-slate-200 rounded-[3rem] hover:border-primary-300">
                                Strategic Catalog
                            </button>
                        </div>
                    </div>

                    {/* Desktop Visualization */}
                    <div className="relative animate-slide-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg-main to-transparent z-20 pointer-events-none"></div>
                        <div className="absolute inset-0 bg-primary-500/10 blur-[180px] rounded-full scale-110 -z-10 animate-pulse" style={{ animationDuration: '10s' }}></div>
                        <div className="p-6 bg-white/40 backdrop-blur-md rounded-[4rem] border border-white/60 shadow-medical-lg">
                            <div className="bg-white rounded-[3.5rem] overflow-hidden border border-gray-200 shadow-inner group relative">
                                <div className="h-14 bg-gray-50/90 border-b border-gray-100 flex items-center px-12 gap-4">
                                    <div className="flex gap-2.5">
                                        <div className="w-3.5 h-3.5 rounded-full bg-primary-400/20 group-hover:bg-primary-400 transition-all duration-300"></div>
                                        <div className="w-3.5 h-3.5 rounded-full bg-accent-400/20 group-hover:bg-accent-400 transition-all duration-300"></div>
                                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-400/20 group-hover:bg-emerald-400 transition-all duration-300"></div>
                                    </div>
                                    <div className="mx-auto bg-white/70 border border-gray-200 rounded-xl px-16 py-1.5 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] shadow-sm">
                                        nexus-portal.nexalith.com / dashboard
                                    </div>
                                </div>
                                <img
                                    src={mockup}
                                    alt="Nexalith Portal Dashboard"
                                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
                                    style={{ filter: 'hue-rotate(200deg) saturate(1.4) brightness(1.1)' }}
                                />
                            </div>
                        </div>

                        {/* Floating Interaction Cards */}
                        <div className="absolute -left-16 top-1/4 medical-card p-6 shadow-2xl animate-float hidden lg:block border-l-4 border-l-accent-500 translate-x-10 opacity-0 animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-accent-50 text-accent-600 rounded-2xl flex items-center justify-center shadow-inner">
                                    <TrendingUp size={28} />
                                </div>
                                <div>
                                    <p className="subtle-label mb-0.5 whitespace-nowrap">Clinical Efficiency</p>
                                    <p className="text-3xl font-black text-slate-900 tracking-tighter">+24.8%</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -right-16 bottom-1/4 medical-card p-6 shadow-2xl animate-float hidden lg:block border-l-4 border-l-primary-500 -translate-x-10 opacity-0 animate-fade-in" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-primary-50 text-primary-500 rounded-2xl flex items-center justify-center shadow-inner">
                                    <Zap size={28} />
                                </div>
                                <div>
                                    <p className="subtle-label mb-0.5 whitespace-nowrap">Claim Processing</p>
                                    <p className="text-3xl font-black text-slate-900 tracking-tighter">12 Hours</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid Modules */}
                <section className="max-w-[1400px] mx-auto px-8 mt-64">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {[
                            { icon: <Cpu />, color: 'primary', title: 'Neural Core RCM', desc: 'End-to-end procedural intelligence including laboratory stratification and multi-payer orchestrations.' },
                            { icon: <ShieldCheck />, color: 'emerald', title: 'Credentialing Nodes', desc: 'Accelerate provider provisioning and network enrollment with our high-velocity enrollment protocols.' },
                            { icon: <Database />, color: 'amber', title: 'Compliance Matrix', desc: 'Unmatched 100% HIPAA-grade infrastructure. Our tactical protocols safeguard your entire capital data lake.' }
                        ].map((item, i) => (
                            <div key={i} className="group space-y-8 p-4">
                                <div className={`w-16 h-16 bg-white rounded-3xl shadow-medical-md flex items-center justify-center text-${item.color}-500 border border-gray-100 group-hover:scale-110 group-hover:shadow-medical-lg transition-all duration-500`}>
                                    {React.cloneElement(item.icon, { size: 32 })}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black text-slate-950 tracking-tight group-hover:text-primary-500 transition-colors">{item.title}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed text-lg">
                                        {item.desc}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 text-primary-500 font-black text-[10px] uppercase tracking-[0.25em] group-hover:translate-x-2 transition-transform cursor-pointer">
                                    Access Specification <ArrowUpRight size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Taxonomy/Specialties */}
                <section className="max-w-[1500px] mx-auto px-10 mt-64 relative">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-accent-500/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
                    <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-32">
                        <div className="max-w-4xl space-y-8">
                            <h2 className="text-7xl font-black text-slate-950 tracking-[-0.04em] leading-[0.9]">
                                Strategic <span className="text-primary-500">Clinical Focus</span> <br />
                                Matrix
                            </h2>
                            <p className="text-2xl text-slate-500 font-semibold max-w-2xl tracking-tight leading-relaxed">
                                Our protocols are custom-calibrated for high-complexity medical environments, neutralizing operational friction.
                            </p>
                        </div>
                        <div className="btn bg-white shadow-medical-md p-6 text-slate-950 border border-primary-50 rounded-3xl opacity-0 animate-fade-in px-10 h-auto" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                            <span className="text-primary-500 mr-3 text-lg animate-pulse">●</span>
                            <span className="text-[12px] font-black uppercase tracking-widest">8+ Tier-1 Specialized Nodes</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            { title: 'Lithotripsy', desc: 'Complex stone procedure logic' },
                            { title: 'Robotic Surgery', desc: 'High-value procedural coding' },
                            { title: 'Wound Care', desc: 'Complex skin graft billing' },
                            { title: 'Radiology', desc: 'Imaging-specific RCM' },
                            { title: 'Laboratory', desc: 'High-volume diagnostic' },
                            { title: 'Credentialing', desc: 'Provider enrollment lifecycle' },
                            { title: 'AR Recovery', desc: 'Aged claim liquidation' },
                            { title: 'Prior-Auths', desc: 'Medical necessity tech' }
                        ].map((spec, i) => (
                            <div key={i} className="group medical-card p-12 hover:bg-slate-950 hover:border-slate-800 transition-all duration-700 cursor-pointer relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/0 group-hover:bg-primary-500/5 blur-3xl transition-all duration-700"></div>
                                <h4 className="text-[11px] font-black text-slate-400 mb-3 uppercase tracking-[0.25em] group-hover:text-primary-400 transition-colors">
                                    {spec.title}
                                </h4>
                                <p className="text-xl font-black text-slate-900 group-hover:text-white transition-colors tracking-tight leading-tight">{spec.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="bg-slate-950 py-32 mt-64 border-t border-white/5">
                <div className="max-w-[1400px] mx-auto px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-32">
                        <div className="lg:col-span-5 space-y-10">
                            <NexalithLogo size={0.65} theme="dark" />
                            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm">
                                Empowering healthcare providers with high-velocity revenue cycle intelligence and tactical billing protocols.
                            </p>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white hover:bg-primary-500 transition-colors cursor-pointer group">
                                    <Globe size={20} className="group-hover:rotate-12 transition-transform" />
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white hover:bg-primary-500 transition-colors cursor-pointer group">
                                    <Shield size={20} className="group-hover:rotate-12 transition-transform" />
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-24">
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-40">Network</h4>
                                <ul className="space-y-4">
                                    {['Dashboard', 'Statistics', 'Security', 'Compliance'].map(item => (
                                        <li key={item}><a href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">{item}</a></li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-40">Protocols</h4>
                                <ul className="space-y-4">
                                    {['RCM Infrastructure', 'Billing Logic', 'Payer Matrix', 'API Gateway'].map(item => (
                                        <li key={item}><a href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">{item}</a></li>
                                    ))}
                                </ul>
                            </div>
                            <div className="hidden sm:block space-y-6">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-40">Contact Node</h4>
                                <div className="space-y-4 text-sm font-bold text-slate-500">
                                    <p>Newark, Delaware, US</p>
                                    <p className="text-white">1-(888) 816-6676</p>
                                    <p className="text-primary-400">info@nexalith.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex flex-col md:flex-row items-center gap-10">
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
                                &copy; 2026 NEXALITH PORTAL
                            </p>
                            <div className="flex gap-8">
                                {['Privacy', 'HIPAA', 'ISO-27001'].map(item => (
                                    <a key={item} href="#" className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] hover:text-white transition-colors">
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 rounded-2xl border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Synapse Global: Active</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
