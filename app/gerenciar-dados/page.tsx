"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function ManageData() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: '',
        cpf: '',
        rg: '',
        birthDate: '',
        phone: '',
        email: '',
        zipCode: '',
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: 'SP',
        days: '1',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const saveData = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        const data = {
            full_name: formData.fullName,
            cpf: formData.cpf,
            rg: formData.rg,
            birth_date: formData.birthDate,
            phone: formData.phone,
            email: formData.email,
            address_zip: formData.zipCode,
            address_street: formData.street,
            address_number: formData.number,
            address_neighborhood: formData.neighborhood,
            address_city: formData.city,
            address_state: formData.state,
            certificate_days: parseInt(formData.days),
            symptoms_description: formData.description,
            status: 'pending_payment'
        };

        try {
            const { data: result, error } = await supabase
                .from('user_requests')
                .insert([data])
                .select();

            if (error) throw error;

            if (result && result.length > 0) {
                const id = result[0].id;
                router.push(`/pagamento?id=${id}`);
            }
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Erro ao salvar dados. Por favor, tente novamente.');
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-inter text-text-main dark:text-white antialiased selection:bg-primary/20 selection:text-primary-dark">
            <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24">
                <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 border-b border-border-light dark:border-border-dark">
                    <Link href="/" className="text-text-main dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-surface-light dark:hover:bg-surface-dark transition-colors border border-transparent hover:border-border-light dark:hover:border-border-dark">
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    </Link>
                    <h2 className="text-text-main dark:text-white text-lg font-semibold leading-tight flex-1 text-center">Editar Perfil</h2>
                    <div className="flex size-10 items-center justify-center">
                        <button className="text-primary font-medium text-sm hover:text-primary-dark transition-colors">
                            Ajuda
                        </button>
                    </div>
                </header>
                <div className="flex flex-col items-center pt-8 pb-4 px-6 bg-gradient-to-b from-surface-light/50 to-transparent dark:from-surface-dark/50">
                    <div className="relative group cursor-pointer">
                        <div className="bg-center bg-no-repeat bg-cover rounded-full h-24 w-24 border border-border-light dark:border-border-dark shadow-soft transition-transform transform group-hover:scale-105" data-alt="User profile portrait in a medical context, clean and professional look" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDyJcGkaedclfhoOWrx3GeXP-uQdzOeESLXuVqKiBoNq9J9iyYFeTyD5g2PzBmDd5LmXY2EUgOKunmET0rLDy3pL83MmKmHleGi9u2JiBdzyumWdlZNmt6fN_XfqHKVjvNcg4Dq1OtgnAwZEkLfHKUqy1ve_JpncfVD0Vo1ieX584UWQGGAKzXSFWS-HJNZ7OYe-8yMwS7DIQpJVravwAMKmruedRGrkDT6XZJZs3TyD33Q4o4IPF4KStDEshNv-MFf9dblrGd5OR_W")' }}>
                        </div>
                        <div className="absolute bottom-0 right-0 bg-white dark:bg-zinc-800 rounded-full p-2 border border-border-light dark:border-border-dark flex items-center justify-center shadow-md hover:bg-primary/5 transition-colors group-hover:border-primary/50">
                            <span className="material-symbols-outlined text-primary text-[18px]">photo_camera</span>
                        </div>
                    </div>
                    <div className="mt-4 text-center space-y-1">
                        <p className="text-text-main dark:text-white text-xl font-semibold tracking-tight">{formData.fullName || 'Seu Nome'}</p>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/30 dark:bg-primary/10 border border-accent dark:border-primary/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                            <p className="text-primary-dark dark:text-primary text-xs font-medium">Conta Verificada</p>
                        </div>
                    </div>
                </div>
                <form className="space-y-8 mt-2" onSubmit={saveData}>
                    <div className="px-5">
                        <div className="pb-3 flex items-center gap-2 border-b border-border-light dark:border-border-dark mb-4">
                            <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
                            <h3 className="text-text-main dark:text-white text-base font-semibold">Dados Pessoais</h3>
                        </div>
                        <div className="flex flex-col gap-5">
                            <label className="flex flex-col flex-1 group">
                                <p className="text-text-muted text-xs font-medium uppercase tracking-wider pb-2 group-focus-within:text-primary transition-colors">Nome Completo</p>
                                <div className="relative">
                                    <input required id="fullName" value={formData.fullName} onChange={handleChange} className="form-input flex w-full rounded-lg text-text-main dark:text-white focus:ring-1 focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 px-4 text-sm font-normal shadow-sm transition-all" placeholder="Digite seu nome completo" />
                                </div>
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col group">
                                    <p className="text-text-muted text-xs font-medium uppercase tracking-wider pb-2 group-focus-within:text-primary transition-colors">CPF</p>
                                    <input required id="cpf" value={formData.cpf} onChange={handleChange} className="form-input flex w-full rounded-lg text-text-main dark:text-white focus:ring-1 focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 px-4 text-sm font-normal shadow-sm transition-all" placeholder="000.000.000-00" />
                                </label>
                                <label className="flex flex-col group">
                                    <p className="text-text-muted text-xs font-medium uppercase tracking-wider pb-2 group-focus-within:text-primary transition-colors">RG</p>
                                    <input required id="rg" value={formData.rg} onChange={handleChange} className="form-input flex w-full rounded-lg text-text-main dark:text-white focus:ring-1 focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 px-4 text-sm font-normal shadow-sm transition-all" placeholder="00.000.000-0" />
                                </label>
                            </div>
                            <label className="flex flex-col flex-1 group">
                                <p className="text-text-muted text-xs font-medium uppercase tracking-wider pb-2 group-focus-within:text-primary transition-colors">Data de Nascimento</p>
                                <div className="relative">
                                    <input required id="birthDate" value={formData.birthDate} onChange={handleChange} className="form-input flex w-full rounded-lg text-text-main dark:text-white focus:ring-1 focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 px-4 text-sm font-normal shadow-sm transition-all" type="date" />
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="pb-3 flex items-center gap-2 border-b border-border-light dark:border-border-dark mb-4">
                            <span className="material-symbols-outlined text-primary text-[20px]">contact_phone</span>
                            <h3 className="text-text-main dark:text-white text-base font-semibold">Contato</h3>
                        </div>
                        <div className="flex flex-col gap-5">
                            <label className="flex flex-col flex-1 group">
                                <p className="text-text-muted text-xs font-medium uppercase tracking-wider pb-2 group-focus-within:text-primary transition-colors">Celular</p>
                                <div className="relative">
                                    <input required id="phone" value={formData.phone} onChange={handleChange} className="form-input flex w-full rounded-lg text-text-main dark:text-white focus:ring-1 focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 px-4 text-sm font-normal shadow-sm transition-all" placeholder="(00) 00000-0000" type="tel" />
                                    <div className="absolute right-3 top-3 bg-green-500/10 rounded-full p-0.5">
                                        <span className="material-symbols-outlined text-green-600 text-[18px]">check</span>
                                    </div>
                                </div>
                            </label>
                            <label className="flex flex-col flex-1 group">
                                <p className="text-text-muted text-xs font-medium uppercase tracking-wider pb-2 group-focus-within:text-primary transition-colors">E-mail</p>
                                <div className="relative">
                                    <input required id="email" value={formData.email} onChange={handleChange} className="form-input flex w-full rounded-lg text-text-main dark:text-white focus:ring-1 focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 px-4 text-sm font-normal shadow-sm transition-all" placeholder="seuemail@dominio.com" type="email" />
                                    <div className="absolute right-3 top-3">
                                        <span className="material-symbols-outlined text-text-muted text-[20px]">mail</span>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="pb-3 flex items-center gap-2 border-b border-border-light dark:border-border-dark mb-4">
                            <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
                            <h3 className="text-text-main dark:text-white text-base font-semibold">Endereço</h3>
                        </div>
                        <div className="flex flex-col gap-5">
                            <label className="flex flex-col w-2/3 max-w-[200px] group">
                                <p className="text-text-muted text-xs font-medium uppercase tracking-wider pb-2 group-focus-within:text-primary transition-colors">CEP</p>
                                <div className="relative flex items-center">
                                    <input required id="zipCode" value={formData.zipCode} onChange={handleChange} className="form-input flex w-full rounded-lg text-text-main dark:text-white focus:ring-1 focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 pl-4 pr-10 text-sm font-normal shadow-sm transition-all" placeholder="00000-000" />
                                    <button className="absolute right-3 text-primary hover:text-primary-dark transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">search</span>
                                    </button>
                                </div>
                            </label>
                            <label className="flex flex-col flex-1 group">
                                <p className="text-text-muted text-xs font-medium uppercase tracking-wider pb-2 group-focus-within:text-primary transition-colors">Logradouro</p>
                                <input required id="street" value={formData.street} onChange={handleChange} className="form-input flex w-full rounded-lg text-text-main dark:text-white focus:ring-1 focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 px-4 text-sm font-normal shadow-sm transition-all" placeholder="Nome da rua" />
                            </label>
                            <div className="grid grid-cols-[1fr_2fr] gap-4">
                                <label className="flex flex-col group">
                                    <p className="text-text-muted text-xs font-medium uppercase tracking-wider pb-2 group-focus-within:text-primary transition-colors">Número</p>
                                    <input required id="number" value={formData.number} onChange={handleChange} className="form-input flex w-full rounded-lg text-text-main dark:text-white focus:ring-1 focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 px-4 text-sm font-normal shadow-sm transition-all" placeholder="000" />
                                </label>
                                <label className="flex flex-col group">
                                    <p className="text-text-muted text-xs font-medium uppercase tracking-wider pb-2 group-focus-within:text-primary transition-colors">Bairro</p>
                                    <input required id="neighborhood" value={formData.neighborhood} onChange={handleChange} className="form-input flex w-full rounded-lg text-text-main dark:text-white focus:ring-1 focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 px-4 text-sm font-normal shadow-sm transition-all" placeholder="Bairro" />
                                </label>
                            </div>
                            <div className="grid grid-cols-[2fr_1fr] gap-4">
                                <label className="flex flex-col group">
                                    <p className="text-text-muted text-xs font-medium uppercase tracking-wider pb-2 group-focus-within:text-primary transition-colors">Cidade</p>
                                    <input required id="city" value={formData.city} onChange={handleChange} className="form-input flex w-full rounded-lg text-text-main dark:text-white focus:ring-1 focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 px-4 text-sm font-normal shadow-sm transition-all" placeholder="Cidade" />
                                </label>
                                <label className="flex flex-col group">
                                    <p className="text-text-muted text-xs font-medium uppercase tracking-wider pb-2 group-focus-within:text-primary transition-colors">UF</p>
                                    <div className="relative">
                                        <select id="state" value={formData.state} onChange={handleChange} className="form-select flex w-full rounded-lg text-text-main dark:text-white focus:ring-1 focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-12 px-4 text-sm font-normal shadow-sm transition-all appearance-none">
                                            <option value="SP">SP</option>
                                            <option value="RJ">RJ</option>
                                            <option value="MG">MG</option>
                                        </select>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="pb-3 flex items-center gap-2 border-b border-border-light dark:border-border-dark mb-4">
                            <span className="material-symbols-outlined text-primary text-[20px]">medical_information</span>
                            <h3 className="text-text-main dark:text-white text-base font-semibold">Informações do Atestado</h3>
                        </div>
                        <div className="flex flex-col gap-5">
                            <label className="flex flex-col group">
                                <p className="text-text-muted text-xs font-medium uppercase tracking-wider pb-2 group-focus-within:text-primary transition-colors">Dias de Atestado</p>
                                <select required id="days" value={formData.days} onChange={handleChange} className="form-select flex w-full rounded-lg text-text-main dark:text-white focus:ring-1 focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary h-12 px-4 text-sm font-normal shadow-sm transition-all appearance-none">
                                    <option value="1">1 dia</option>
                                    <option value="2">2 dias</option>
                                </select>
                            </label>
                            <label className="flex flex-col flex-1 group">
                                <p className="text-text-muted text-xs font-medium uppercase tracking-wider pb-2 group-focus-within:text-primary transition-colors">Descrição dos Sintomas</p>
                                <textarea required id="description" value={formData.description} onChange={handleChange} className="form-textarea flex w-full rounded-lg text-text-main dark:text-white focus:ring-1 focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary placeholder:text-gray-400 px-4 py-3 text-sm font-normal shadow-sm transition-all resize-none" rows={4} placeholder="Descreva seus sintomas ou motivo do atestado..."></textarea>
                                <p className="text-xs text-gray-400 mt-1">Esta informação será avaliada pelo médico</p>
                            </label>
                        </div>
                    </div>
                    <div className="h-28"></div>
                </form>
                <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-zinc-950/90 border-t border-border-light dark:border-border-dark p-4 pb-8 flex flex-col gap-3 backdrop-blur-md">
                    <button onClick={() => saveData()} className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-text-main dark:bg-white text-white dark:text-black text-sm font-semibold hover:opacity-90 transition-opacity shadow-soft">
                        <span className="truncate">Salvar Alterações</span>
                    </button>
                    <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-transparent border border-border-light dark:border-border-dark text-text-muted hover:text-text-main dark:hover:text-white text-sm font-medium hover:bg-surface-light dark:hover:bg-zinc-900 transition-colors">
                        <span className="truncate">Cancelar</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
