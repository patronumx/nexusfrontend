import React, { useState } from 'react';
import { Shield, Lock, X, AlertCircle, CheckCircle2, ShieldCheck, User } from 'lucide-react';
import { userService } from '../services/api';

const ChangePasswordModal = ({ isOpen, onClose }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validatePass = (pass) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(pass);
        const hasLowerCase = /[a-z]/.test(pass);
        const hasNumber = /[0-9]/.test(pass);
        const hasSpecialChar = /[!@?><%^&*()-_+=]/.test(pass);

        if (pass.length < minLength) return "Minimum 8 characters required.";
        if (!hasUpperCase) return "Uppercase letter required.";
        if (!hasLowerCase) return "Lowercase letter required.";
        if (!hasNumber) return "Numerical digit required.";
        if (!hasSpecialChar) return "Special character (!@?><...) required.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const validationError = validatePass(newPassword);
        if (validationError) {
            setError(validationError);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            await userService.changePassword(oldPassword, newPassword);
            setSuccess('Password updated successfully');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.old_password?.[0] || err.response?.data?.new_password?.[0] || 'Failed to update password');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden relative animate-slide-up">
                {/* Header */}
                <div className="bg-[#111827] p-8 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="w-12 h-12 bg-primary-500/20 border border-primary-500/30 rounded-2xl flex items-center justify-center text-primary-400 mb-6">
                        <ShieldCheck size={24} />
                    </div>

                    <h2 className="text-2xl font-black tracking-tight mb-2">Update Credentials</h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] opacity-80">Secure Identity Layer / Policy Enforcement</p>
                </div>

                <div className="p-8">
                    {/* Complexity Requirements */}
                    <div className="mb-8 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Lock size={14} className="text-primary-500" />
                            Security Standards
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                "8-12 Characters minimum",
                                "Uppercase & Lowercase letters",
                                "One numerical digit",
                                "One special character (!@?><)"
                            ].map((rule, i) => (
                                <div key={i} className="flex items-center gap-2.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500/40"></div>
                                    <span className="text-[11px] font-bold text-gray-600">{rule}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 flex items-center gap-3 animate-shake">
                                <AlertCircle size={18} />
                                <span className="text-[11px] font-black uppercase tracking-widest">{error}</span>
                            </div>
                        )}
                        {success && (
                            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 flex items-center gap-3">
                                <CheckCircle2 size={18} />
                                <span className="text-[11px] font-black uppercase tracking-widest">{success}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Current Password</label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#111827] hover:bg-[#1f2937] text-white py-4 pr-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-gray-200 flex items-center justify-center gap-2 group transition-all active:scale-[0.98] mt-4"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Sync Credentials</span>
                                    <Shield size={18} className="group-hover:scale-110 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
