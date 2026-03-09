import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Lock, Terminal, Activity, ArrowRight, Eye, EyeOff, Key } from 'lucide-react';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import NexalithLogo from '../components/NexalithLogo';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
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
            setError(`POLICY VIOLATION: ${validationError}`);
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const user = await login(username, password);
            if (user?.role === 'admin' || user?.user_type === 'admin') {
                navigate('/0x-sec-ops-v9');
            } else {
                setError('PERMISSION DENIED: Identity mismatch for secure nexus.');
            }
        } catch (err) {
            setError('ACCESS RESTRICTED: Invalid authorization tokens.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-['Plus_Jakarta_Sans'] selection:bg-primary-500/30">
            {/* High-Fidelity Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary-500/10 blur-[150px] rounded-full -mr-96 -mt-96"></div>
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[150px] rounded-full -ml-96 -mb-96"></div>
                <div className="absolute inset-0 background-grid opacity-[0.03]"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-12 animate-fade-in">
                    <div className="flex justify-center mb-10">
                        <NexalithLogo size={0.7} variant="compact" theme="dark" className="bg-white/5 p-8 rounded-[3rem] border border-white/10 backdrop-blur-md shadow-2xl shadow-black/50" />
                    </div>
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-600/10 border border-primary-500/20 rounded-2xl text-primary-500 mb-6 shadow-glow animate-pulse">
                        <Terminal size={28} />
                    </div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-[0.4em] mb-3">Secure Nexus Gate</h1>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Authorized administrative personnel only</p>
                </div>

                <div className="bg-[#11141b] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl shadow-black/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-2xl flex items-center gap-3 animate-shake">
                                <ShieldAlert size={18} />
                                <span className="text-[10px] font-black uppercase tracking-widest">{error}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Identity Chain</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter encrypted ID..."
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium text-white placeholder:text-gray-700 focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/5 transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Access Token</label>
                            <div className="relative group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium text-white placeholder:text-gray-700 focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/5 transition-all outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setIsForgotModalOpen(true)}
                                className="text-[10px] font-black text-primary-500 uppercase tracking-widest hover:text-primary-400 transition-colors flex items-center gap-2"
                            >
                                <Key size={12} />
                                Recovery Protocol
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-primary-900/40 flex items-center justify-center gap-3 group active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Establish link</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-all" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center pt-8 border-t border-white/5">
                    <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.3em]">
                        Warning: All attempts at unauthorized access are logged <br />
                        and reported to the cyber security node.
                    </p>
                </div>
            </div>

            <ForgotPasswordModal
                isOpen={isForgotModalOpen}
                onClose={() => setIsForgotModalOpen(false)}
            />
        </div>
    );
};

export default AdminLogin;
