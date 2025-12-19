import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-border-light dark:border-border-dark">
        <div className="flex items-center justify-between px-6 py-4 max-w-md mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-primary text-white shadow-sm">
              <span className="material-symbols-outlined text-[20px]">local_hospital</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">MediCert</h1>
          </div>
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-light dark:hover:bg-surface-dark transition-colors border border-transparent hover:border-border-light dark:hover:border-border-dark">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>
      <main className="relative flex flex-col w-full max-w-md mx-auto pt-20 min-h-screen overflow-x-hidden">
        <section className="relative px-6 py-12 overflow-hidden medical-pattern">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
          <div className="flex flex-col items-start text-left gap-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Atendimento Online 24h</span>
            </div>
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 dark:text-white">
              Atestados médicos <br />
              <span className="text-primary font-medium">digitais e legais</span>.
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed border-l-2 border-primary pl-4">
              Emissão segura por médicos certificados. Documentação válida em todo o Brasil (Lei 13.989).
            </p>
            <div className="w-full pt-4">
              <Link href="/gerenciar-dados" className="w-full bg-white dark:bg-white text-black font-bold text-lg h-14 rounded-lg transition-all hover:bg-slate-100 flex items-center justify-between px-6 border border-slate-200">
                <span>Comprar Atestado</span>
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </div>
              </Link>
              <div className="flex items-center gap-4 mt-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                  CRM Ativo
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
                  Dados Criptografados
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="px-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-lg border border-border-light dark:border-border-dark hover:border-primary/50 transition-colors">
              <span className="material-symbols-outlined text-slate-900 dark:text-white mb-3 text-[32px]">speed</span>
              <h3 className="font-bold text-base mb-1">Ultra Rápido</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Entrega imediata via e-mail.</p>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-lg border border-border-light dark:border-border-dark hover:border-primary/50 transition-colors">
              <span className="material-symbols-outlined text-slate-900 dark:text-white mb-3 text-[32px]">gavel</span>
              <h3 className="font-bold text-base mb-1">100% Legal</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Amparado por lei federal.</p>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-lg border border-border-light dark:border-border-dark hover:border-primary/50 transition-colors">
              <span className="material-symbols-outlined text-slate-900 dark:text-white mb-3 text-[32px]">lock</span>
              <h3 className="font-bold text-base mb-1">Sigilo Médico</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Privacidade absoluta.</p>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-lg border border-border-light dark:border-border-dark hover:border-primary/50 transition-colors">
              <span className="material-symbols-outlined text-slate-900 dark:text-white mb-3 text-[32px]">qr_code_2</span>
              <h3 className="font-bold text-base mb-1">Auditável</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">QR Code de verificação.</p>
            </div>
          </div>
        </section>
        <section className="px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Processo Simplificado</h2>
          </div>
          <div className="relative space-y-8">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border-light dark:bg-border-dark"></div>
            <div className="relative flex gap-6 group">
              <div className="relative z-10 shrink-0">
                <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm border-2 border-transparent group-hover:border-primary transition-colors">1</div>
              </div>
              <div>
                <h3 className="text-lg font-bold">Triagem Digital</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">Preencha o formulário seguro com seus dados e sintomas.</p>
              </div>
            </div>
            <div className="relative flex gap-6 group">
              <div className="relative z-10 shrink-0">
                <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm border-2 border-transparent group-hover:border-primary transition-colors">2</div>
              </div>
              <div>
                <h3 className="text-lg font-bold">Análise Médica</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">Um especialista avalia seu caso, podendo solicitar contato.</p>
              </div>
            </div>
            <div className="relative flex gap-6">
              <div className="relative z-10 shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">Emissão do Documento</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">Receba o PDF assinado digitalmente em minutos.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="px-6 py-4">
          <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark relative">
            <div className="flex gap-1 text-primary mb-4">
              <span className="material-symbols-outlined text-[18px] fill-current">star</span>
              <span className="material-symbols-outlined text-[18px] fill-current">star</span>
              <span className="material-symbols-outlined text-[18px] fill-current">star</span>
              <span className="material-symbols-outlined text-[18px] fill-current">star</span>
              <span className="material-symbols-outlined text-[18px] fill-current">star</span>
            </div>
            <p className="text-base text-slate-700 dark:text-slate-300 italic mb-6 leading-relaxed">
              &quot;Serviço extremamente profissional. O médico foi atencioso durante a avaliação e o documento chegou com todas as validações necessárias.&quot;
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-border-light dark:border-border-dark">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center grayscale" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDKQyYG7iXmP69MEiY_b8eCOvzyyu9q709rM3Pm11IRDU-yGii9aAWFEb-uelO6klWNrFVc4Yrir-IrsdFJTxEqvCeb596Y7XgeAE4fjHkKNJXRyczulF1eHhUBWFy2ySYfJTUokxR25lo1lyaf-p6Uc_XoZLkIRrhpBxY4FkNobs-sx1131lejXSu7oMR2iDJY1BtgcgRF7aGK9YQDtDKF_Hb8f5Lb5_ogBryQnZBK30y3fNVDmOo7naz3L6ZK3ajYK7cm6Ald_nNL')" }}></div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">Carlos Mendes</p>
                <p className="text-xs text-slate-500">Paciente verificado</p>
              </div>
            </div>
          </div>
        </section>
        <section className="px-6 py-12 pb-32">
          <h2 className="text-2xl font-bold mb-8 text-left">Perguntas Frequentes</h2>
          <div className="flex flex-col gap-0 divide-y divide-border-light dark:divide-border-dark border-y border-border-light dark:border-border-dark">
            <details className="group bg-transparent">
              <summary className="flex justify-between items-center py-5 cursor-pointer font-medium select-none text-slate-900 dark:text-white hover:text-primary transition-colors">
                Qual a validade jurídica?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-slate-400">expand_more</span>
              </summary>
              <div className="pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Total validade. Atestados emitidos via telemedicina são amparados pela Lei 13.989 e Resolução do CFM, possuindo assinatura digital ICP-Brasil.
              </div>
            </details>
            <details className="group bg-transparent">
              <summary className="flex justify-between items-center py-5 cursor-pointer font-medium select-none text-slate-900 dark:text-white hover:text-primary transition-colors">
                Quanto tempo demora?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-slate-400">expand_more</span>
              </summary>
              <div className="pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                O tempo médio é de 15 a 30 minutos entre o preenchimento e o recebimento, dependendo da disponibilidade imediata dos médicos plantonistas.
              </div>
            </details>
            <details className="group bg-transparent">
              <summary className="flex justify-between items-center py-5 cursor-pointer font-medium select-none text-slate-900 dark:text-white hover:text-primary transition-colors">
                O médico pode negar o atestado?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-slate-400">expand_more</span>
              </summary>
              <div className="pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Sim. O atestado é um ato médico e depende da avaliação profissional. Caso não seja constatada necessidade de afastamento, o valor será reembolsado.
              </div>
            </details>
          </div>
        </section>
        <footer className="bg-surface-light dark:bg-surface-dark py-12 px-6 border-t border-border-light dark:border-border-dark mt-auto">
          <div className="flex flex-col gap-8 max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">local_hospital</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">MediCert</span>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm text-slate-500">
              <div className="flex flex-col gap-3">
                <span className="font-bold text-slate-900 dark:text-white">Legal</span>
                <a className="hover:text-primary transition-colors" href="#">Termos de Uso</a>
                <a className="hover:text-primary transition-colors" href="#">Privacidade</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-bold text-slate-900 dark:text-white">Ajuda</span>
                <a className="hover:text-primary transition-colors" href="#">Suporte</a>
                <a className="hover:text-primary transition-colors" href="#">FAQ</a>
              </div>
            </div>
            <div className="text-xs text-slate-400 border-t border-border-light dark:border-border-dark pt-8">
              <p className="mb-2">CNPJ: 00.000.000/0001-00</p>
              <p>© 2023 MediCert. Todos os direitos reservados.</p>
              <p className="mt-4 opacity-60">Atenção: Serviço de telemedicina para casos de baixa complexidade. Em caso de emergência, procure um hospital.</p>
            </div>
          </div>
        </footer>
        <div className="fixed bottom-0 left-0 w-full p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-border-light dark:border-border-dark z-40">
          <Link href="/gerenciar-dados" className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg h-12 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
            Solicitar Atestado
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>
      </main>
    </>
  );
}
