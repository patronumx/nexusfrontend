import React from 'react';
import { ShieldAlert, X, Mail, Phone, ExternalLink, Activity } from 'lucide-react';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-slide-up">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-[60px] rounded-full -mr-16 -mt-16"></div>

                <div className="p-10 text-center">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="w-20 h-20 bg-primary-50 border border-primary-100 rounded-3xl flex items-center justify-center text-primary-600 mx-auto mb-8 shadow-inner">
                        <ShieldAlert size={40} />
                    </div>

                    <h2 className="text-3xl font-black text-[#111827] tracking-tight mb-4">Identity Recovery</h2>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed mb-10 px-4">
                        For your security, automated password resets are disabled. Please contact the
                        <strong className="text-gray-900 mx-1">System Administrator</strong>
                        to verify your identity and restore access tokens.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-primary-200 transition-colors">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-500 shadow-sm">
                                <Mail size={18} />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">System Admin Email</p>
                                <p className="text-sm font-black text-[#111827]">it.ops@nexalith.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-primary-200 transition-colors">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
                                <Phone size={18} />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">Internal Helpline</p>
                                <p className="text-sm font-black text-[#111827]">1-888-816-6676 (Ext 104)</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full mt-10 bg-[#111827] hover:bg-[#1f2937] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all"
                    >
                        Close Protocol
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordModal;
