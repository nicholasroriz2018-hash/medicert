"use client";
import React, { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

function PaymentContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const price = parseFloat(searchParams.get('price') || '29.90');
    const days = parseInt(searchParams.get('days') || '1');

    // Dados de pagamento por faixa de preço
    const paymentData: Record<number, { qrCode: string; pixCode: string; daysRange: string }> = {
        29.90: {
            qrCode: '/pix-qrcode.jpg', // QR code existente
            pixCode: '00020126580014br.gov.bcb.pix0136b354ecac-bbc2-47b5-bc5e-3b01855799cd520400005303986540529.905802BR5925NICHOLAS ALEXANDER MEDEIR6009Sao Paulo62290525REC693B7AA02381D135004735630475B5',
            daysRange: '1-2 dias'
        },
        49.90: {
            qrCode: '/pix-qrcode-49.jpg',
            pixCode: '00020126580014br.gov.bcb.pix0136b354ecac-bbc2-47b5-bc5e-3b01855799cd520400005303986540549.905802BR5925NICHOLAS ALEXANDER MEDEIR6009Sao Paulo62290525REC69552218512537770284276304FB60',
            daysRange: '3-5 dias'
        },
        69.90: {
            qrCode: '/pix-qrcode-69.jpg',
            pixCode: '00020126580014br.gov.bcb.pix0136b354ecac-bbc2-47b5-bc5e-3b01855799cd520400005303986540569.905802BR5925NICHOLAS ALEXANDER MEDEIR6009Sao Paulo62290525REC695521BFC5F9258545174363046477',
            daysRange: '6-7 dias'
        }
    };

    const currentPayment = paymentData[price] || paymentData[29.90];

    const confirmPayment = async () => {
        if (!id) {
            alert('Erro: ID do pedido não encontrado.');
            return;
        }

        try {
            const { error } = await supabase
                .from('user_requests')
                .update({ status: 'paid_waiting' })
                .eq('id', id);

            if (error) throw error;

            alert('Pagamento confirmado! Em breve você receberá seu atestado.');
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Erro ao confirmar pagamento. Por favor, tente novamente.');
        }
    };

    return (
        <div className="bg-payment-bg-light dark:bg-payment-bg-dark font-public text-gray-900 dark:text-gray-100 antialiased selection:bg-payment-primary selection:text-black">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-white dark:bg-background-dark shadow-xl pb-32">
                <header className="sticky top-0 z-20 flex items-center bg-white/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-4 justify-between border-b border-gray-100 dark:border-gray-800">
                    <Link href="/" className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-900 dark:text-white">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Pagamento via Pix</h2>
                    <div className="flex size-10 shrink-0 items-center justify-center text-payment-primary" title="Ambiente Seguro">
                        <span className="material-symbols-outlined text-[20px]">lock</span>
                    </div>
                </header>
                <section className="px-4 pt-6 pb-2">
                    <div className="group relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 p-4 transition-all shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-gray-200">
                                <img alt="Atestado Médico Digital" className="h-full w-full object-cover" data-alt="Doctor holding a digital tablet with medical data" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXRE4Qgd6tc0Ye2jvJwMlO502pRoW4duls-bYnPOhsJGTOdIloKx-kCwp7lCPcDZEpQEbJbS0wdWRNjUEOwztd_7DF6TFQJ1QX7B6gSLThM4Dit6ZO0YMyk1sLC1Ud2e4WTGsoBvObINKbWs21J19Olpl1AjvXHCdRMyLoStrkPgJu1DENmVIM7hrzYxN-0bbEwBchL0ZkQqz5FcLE80-Pg6mFXkNwRRDDAZWNC1ffl02YVaviQ8MQzMWgrs3rxohWCMKIf38W75fd" />
                            </div>
                            <div className="flex flex-col justify-between h-20 flex-1">
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">Atestado Médico Digital</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{currentPayment.daysRange} • Documento PDF</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-payment-primary/20 text-green-800 dark:text-green-300">Entrega Imediata</span>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">R$ {price.toFixed(2).replace('.', ',')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="px-4 py-6 space-y-8">
                    <div className="text-center px-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Escaneie o QR Code</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                            Abra o app do seu banco e escaneie o código abaixo para liberar seu atestado instantaneamente.
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative flex items-center justify-center p-6 bg-white dark:bg-white/5 rounded-2xl border-2 border-gray-100 dark:border-gray-700 shadow-sm">
                            {/* QR Code dinâmico baseado no preço */}
                            <img src={currentPayment.qrCode} alt="QR Code PIX" className="w-[180px] h-[180px] object-contain" />
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-payment-primary rounded-tl-lg -mt-1 -ml-1"></div>
                            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-payment-primary rounded-tr-lg -mt-1 -mr-1"></div>
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-payment-primary rounded-bl-lg -mb-1 -ml-1"></div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-payment-primary rounded-br-lg -mb-1 -mr-1"></div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-green-700 dark:text-green-400 bg-payment-primary/10 px-3 py-1.5 rounded-full">
                            <span className="material-symbols-outlined text-[16px]">timer</span>
                            Código válido por 30:00
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Pix Copia e Cola</label>
                        <div className="relative flex items-center group">
                            <input onClick={(e) => { (e.target as HTMLInputElement).select(); navigator.clipboard.writeText((e.target as HTMLInputElement).value); }} className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 py-3.5 pl-4 pr-14 text-sm text-gray-600 dark:text-gray-300 font-mono focus:border-payment-primary focus:ring-payment-primary truncate cursor-pointer transition-colors group-hover:bg-white dark:group-hover:bg-white/10" readOnly type="text" value={currentPayment.pixCode} />
                            <button onClick={(e) => { const input = e.currentTarget.previousElementSibling as HTMLInputElement; navigator.clipboard.writeText(input.value); alert('Código PIX copiado!'); }} className="absolute right-2 p-2 text-payment-primary hover:bg-payment-primary/10 rounded-lg transition-colors" title="Copiar código">
                                <span className="material-symbols-outlined">content_copy</span>
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 ml-1">Toque no ícone para copiar o código automaticamente.</p>
                    </div>
                    <div className="rounded-xl bg-gray-50 dark:bg-white/5 p-5 border border-gray-100 dark:border-gray-800">
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="flex items-center justify-center size-6 rounded-full bg-payment-primary/20 text-green-700 dark:text-green-400">
                                <span className="material-symbols-outlined text-[16px]">priority_high</span>
                            </span>
                            Instruções de Pagamento
                        </h4>
                        <ol className="space-y-3 relative before:absolute before:top-2 before:bottom-2 before:left-[9px] before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
                            <li className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 relative">
                                <span className="flex items-center justify-center size-5 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-[10px] font-bold text-gray-900 dark:text-white shrink-0 z-10">1</span>
                                <span>Abra o aplicativo do seu banco ou carteira digital.</span>
                            </li>
                            <li className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 relative">
                                <span className="flex items-center justify-center size-5 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-[10px] font-bold text-gray-900 dark:text-white shrink-0 z-10">2</span>
                                <span>Escolha a opção <strong>Pix</strong> no menu principal.</span>
                            </li>
                            <li className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 relative">
                                <span className="flex items-center justify-center size-5 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-[10px] font-bold text-gray-900 dark:text-white shrink-0 z-10">3</span>
                                <span>Selecione <strong>Ler QR Code</strong> ou <strong>Pix Copia e Cola</strong>.</span>
                            </li>
                            <li className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 relative">
                                <span className="flex items-center justify-center size-5 rounded-full bg-white dark:bg-gray-800 border-2 border-payment-primary text-[10px] font-bold text-payment-primary shrink-0 z-10 bg-payment-primary/10">4</span>
                                <span className="text-gray-900 dark:text-white font-medium">Confirme o valor e finalize o pagamento.</span>
                            </li>
                        </ol>
                    </div>
                </section>
                <section className="mt-4 px-8 mb-4">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-400 text-center">
                            <span className="material-symbols-outlined text-[16px] text-green-600">verified_user</span>
                            Pagamento processado com segurança bancária (SSL)
                        </div>
                    </div>
                </section>
                <div className="fixed bottom-0 left-0 z-30 w-full bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800 p-4 pb-6">
                    <div className="max-w-md mx-auto">
                        <button onClick={confirmPayment} className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-payment-primary py-4 px-6 text-base font-bold text-black shadow-[0_4px_14px_0_rgba(19,236,91,0.39)] transition-all hover:shadow-[0_6px_20px_rgba(19,236,91,0.23)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none">
                            <span className="material-symbols-outlined">check_circle</span>
                            Já realizei o pagamento
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Pagamento() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <PaymentContent />
        </Suspense>
    );
}
