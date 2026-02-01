
import React, { useState } from 'react';
import { User } from '../types';
import { databaseService } from '../services/databaseService';

interface ProfileSettingsProps {
    user: User;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);

        if (newPassword.length < 4) {
            setStatus({ type: 'error', message: 'La contraseña debe tener al menos 4 caracteres.' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setStatus({ type: 'error', message: 'Las contraseñas no coinciden.' });
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await databaseService.updateUser(user.id, { password: newPassword });
            if (result.success) {
                setStatus({ type: 'success', message: 'Contraseña actualizada correctamente.' });
                setNewPassword('');
                setConfirmPassword('');
            } else {
                throw new Error(result.error || 'Error al actualizar');
            }
        } catch (err: any) {
            setStatus({ type: 'error', message: err.message || 'Error al conectar con el servidor.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12 animate-in fade-in duration-500">
            <div className="bg-[#1e293b] rounded-[2.5rem] border border-slate-800 shadow-2xl p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-10">
                        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-cyan-400 border border-slate-800 shadow-inner">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-tight uppercase">Seguridad de Acceso</h2>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Usuario: {user.username}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-700"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-700"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {status && (
                            <div className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center border ${status.type === 'success'
                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                    : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                                }`}>
                                {status.message}
                            </div>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 bg-cyan-600 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-cyan-500 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
                            >
                                {isSubmitting ? 'Actualizando...' : 'Guardar Nueva Clave'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-12 p-6 bg-slate-900/40 rounded-3xl border border-slate-800/50">
                        <div className="flex gap-4">
                            <div className="text-amber-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-slate-300 text-[11px] font-bold uppercase tracking-tight mb-1">Nota importante</p>
                                <p className="text-slate-500 text-[10px] leading-relaxed">
                                    Al cambiar tu contraseña, la sesión actual se mantendrá activa, pero se requerirá la nueva clave en el próximo inicio de sesión. Asegúrate de guardarla en un lugar seguro.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
