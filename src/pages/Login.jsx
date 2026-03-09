import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, User, Activity, ArrowRight, Eye, EyeOff, ShieldCheck, Zap, Check, TrendingUp } from 'lucide-react';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import NexalithLogo from '../components/NexalithLogo';

const Login = () => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const validatePassword = (pass) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(pass);
        const hasLowerCase = /[a-z]/.test(pass);
        const hasNumber = /[0-9]/.test(pass);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

        if (pass.length < minLength) return "Minimum 8 characters required.";
        if (!hasUpperCase) return "Uppercase letter required.";
        if (!hasLowerCase) return "Lowercase letter required.";
        if (!hasNumber) return "Numerical digit required.";
        if (!hasSpecialChar) return "Special character (!@#$...) required.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validatePassword(password);
        if (validationError) {
            setError(`Security Policy Violation: ${validationError}`);
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await login(username, password);
            navigate('/staff-access');
        } catch (err) {
            setError('Operational Identity Verification Failed. Invalid Access Tokens.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-main flex flex-col md:flex-row font-sans overflow-hidden">
            {/* Immersive Branding Sidebar */}
            <div className="md:w-1/2 bg-slate-950 relative overflow-hidden flex flex-col p-12 md:p-24 justify-between">
                {/* Precision Background Elements */}
                <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary-500/10 blur-[150px] rounded-full -mr-96 -mt-96 animate-pulse" style={{ animationDuration: '8s' }}></div>
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent-500/5 blur-[150px] rounded-full -ml-96 -mb-96 animate-pulse" style={{ animationDuration: '12s' }}></div>
                <div className="absolute inset-0 background-grid opacity-[0.05]"></div>

                <div className="relative z-10 animate-fade-in">
                    <div
                        className="flex items-center cursor-pointer group mb-24"
                        onClick={() => navigate('/')}
                    >
                        <NexalithLogo size={1.2} theme="dark" />
                    </div>

                    <div className="space-y-16 max-w-xl">
                        <div className="space-y-10">
                            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                                Precision <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-300">Revenue Flow</span>
                            </h2>

                            <div className="space-y-8">
                                <p className="text-[10px] font-black text-primary-400 uppercase tracking-[0.4em] opacity-70">Strategic Performance Matrix</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { label: "Revenue Delta", val: "+24.8%", color: "primary" },
                                        { label: "AR Liquidation", val: "12 Days", color: "accent" },
                                        { label: "First-Pass Rate", val: "99.2%", color: "blue" },
                                        { label: "Compliance Score", val: "100%", color: "emerald" }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all duration-500 group shadow-2xl">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-hover:text-primary-300 transition-colors">{stat.label}</p>
                                            <p className="text-3xl font-black text-white tracking-tight">{stat.val}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 pt-16 flex items-center justify-between border-t border-white/5">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.35em]">
                        &copy; 2026 NEXALITH PORTAL
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></div>
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Synapse-Node Active</span>
                    </div>
                </div>
            </div>

            {/* Authentication Core */}
            <div className="md:w-1/2 flex items-center justify-center p-8 md:p-24 bg-white relative">
                <div className="max-w-md w-full animate-slide-up">
                    <div className="mb-16">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100 mb-6">
                            <Shield size={14} className="text-primary-500" />
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Secure Authentication Gateway</span>
                        </div>
                        <h3 className="text-4xl font-black text-slate-950 tracking-tight mb-4">Establish Link</h3>
                        <p className="text-slate-500 font-medium">Inject your enterprise authorization tokens to initialize your deployment node.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        {error && (
                            <div className="p-6 bg-rose-50 text-rose-600 rounded-[2rem] border border-rose-100 flex items-center gap-5 animate-shake">
                                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                                    <Lock size={20} />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest leading-relaxed">{error}</span>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="relative group">
                                <label className="absolute -top-2.5 left-6 px-2 bg-white text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] z-10 group-focus-within:text-primary-500 transition-colors">Operational ID</label>
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="node.omega@nexalith.com"
                                    className="w-full pl-16 pr-8 py-6 bg-slate-50/50 border border-slate-100 rounded-[2rem] font-bold text-slate-900 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="relative group">
                                <label className="absolute -top-2.5 left-6 px-2 bg-white text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] z-10 group-focus-within:text-primary-500 transition-colors">Access Token</label>
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full pl-16 pr-16 py-6 bg-slate-50/50 border border-slate-100 rounded-[2rem] font-bold text-slate-900 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary-500 transition-colors p-2"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-2">
                            <label className="flex items-center gap-4 cursor-pointer group">
                                <div className="relative w-6 h-6 flex items-center justify-center">
                                    <input type="checkbox" className="peer sr-only" />
                                    <div className="w-full h-full bg-slate-50 border border-slate-200 rounded-lg peer-checked:bg-primary-500 peer-checked:border-primary-500 transition-all"></div>
                                    <Check size={16} className="absolute text-white scale-0 peer-checked:scale-100 transition-transform" />
                                </div>
                                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">Persistent Node</span>
                            </label>
                            <button
                                type="button"
                                onClick={() => setIsForgotModalOpen(true)}
                                className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] hover:text-primary-700 transition-colors border-b border-primary-100 hover:border-primary-500 pb-0.5"
                            >
                                Security Recovery
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-900 hover:bg-slate-950 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.25em] shadow-2xl shadow-slate-950/20 flex items-center justify-center gap-4 group transition-all active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    <span>Verifying Node...</span>
                                </>
                            ) : (
                                <>
                                    <span>Establish Link</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-20 pt-10 border-t border-slate-50 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                            Operational Infrastructure <span className="text-primary-500 font-black">Nexalith-Core v9.5</span> <br />
                            Authorized Personnel Only. Un-monitored access is prohibited.
                        </p>
                    </div>
                </div>
            </div>

            <ForgotPasswordModal
                isOpen={isForgotModalOpen}
                onClose={() => setIsForgotModalOpen(false)}
            />
        </div>
    );
};

export default Login;
