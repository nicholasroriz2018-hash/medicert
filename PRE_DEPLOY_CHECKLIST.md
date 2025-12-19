# ✅ Checklist Pré-Deploy - MediCert

## 🔍 Verificações Locais

### Build e Testes
- [ ] **Build de produção sem erros**
  ```bash
  npm run build
  ```
  - Todas as páginas compilam ✅
  - Sem erros TypeScript ✅
  - Sem warnings críticos ✅

- [ ] **Testar build local**
  ```bash
  npm run start
  ```
  - Acessar http://localhost:3000
  - Testar todas as páginas (/, /gerenciar-dados, /pagamento)
  - Verificar responsividade (mobile/desktop)

### Validações de Código
- [ ] **Lint check**
  ```bash
  npm run lint
  ```

- [ ] **TypeScript errors**
  - Sem erros de tipo ✅
  - Imports corretos ✅

## 🌐 Configuração de Ambiente

### Variáveis de Ambiente (Vercel Dashboard)
Configurar em: **Settings → Environment Variables**

#### Obrigatórias ⚠️
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - URL do projeto Supabase
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Chave pública do Supabase
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Chave service role (cuidado!)
- [ ] `GEMINI_API_KEY` - API key do Google Gemini
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Chave pública Stripe
- [ ] `STRIPE_SECRET_KEY` - Chave secreta Stripe
- [ ] `STRIPE_WEBHOOK_SECRET` - Secret do webhook Stripe

#### Opcionais
- [ ] `NEXT_PUBLIC_SITE_URL` - URL do site em produção (ex: https://seu-site.vercel.app)

### Configuração Supabase
Acessar: https://app.supabase.com → Seu Projeto → Settings

- [ ] **Site URL**: Adicionar URL da Vercel
  - Settings → API → URL Configuration → Site URL
  - Exemplo: `https://seu-projeto.vercel.app`

- [ ] **Redirect URLs**: Adicionar URLs de callback
  - Settings → API → URL Configuration → Redirect URLs
  - Adicionar: `https://seu-projeto.vercel.app/**`
  - Adicionar: `https://seu-projeto.vercel.app/auth/callback`

### Configuração Stripe
Acessar: https://dashboard.stripe.com

- [ ] **Webhook para produção**
  - Developers → Webhooks → Add endpoint
  - Endpoint URL: `https://seu-projeto.vercel.app/api/webhooks/stripe`
  - Events to send:
    - `checkout.session.completed`
    - `customer.subscription.updated`
    - `customer.subscription.deleted`
  - Copiar **Signing secret** e adicionar como `STRIPE_WEBHOOK_SECRET` na Vercel

- [ ] **Verificar modo**
  - Ambiente de teste: usar chaves `pk_test_` e `sk_test_`
  - Produção: usar chaves `pk_live_` e `sk_live_`

## 🚀 Deploy

### Opção A: Via GitHub + Vercel (Recomendado)

1. **Push para GitHub**
   ```bash
   git add .
   git commit -m "feat: otimizações de SEO e segurança"
   git push origin main
   ```

2. **Deploy automático na Vercel**
   - Vercel detecta push e faz deploy automaticamente
   - Aguardar ~2-3 minutos

### Opção B: Via CLI Vercel

```bash
# Deploy em produção
vercel --prod
```

## ✅ Validação Pós-Deploy

### Funcionalidade Básica
- [ ] Site carrega: `https://seu-projeto.vercel.app`
- [ ] Página inicial renderiza corretamente
- [ ] Navegação funciona (home → gerenciar-dados → pagamento)
- [ ] Imagens carregam
- [ ] Fontes carregam corretamente
- [ ] Ícones Material Symbols aparecem

### SEO e Meta Tags
- [ ] **Open Graph Debugger**
  - Acessar: https://www.opengraph.xyz/
  - Testar URL do site
  - Verificar preview de compartilhamento social ✅

- [ ] **Meta tags no código**
  - Inspecionar `<head>` da página
  - Verificar title, description, og:image, twitter:card

- [ ] **Robots.txt acessível**
  - Acessar: `https://seu-projeto.vercel.app/robots.txt`
  - Deve retornar conteúdo correto

- [ ] **Sitemap acessível**
  - Acessar: `https://seu-projeto.vercel.app/sitemap.xml`
  - Deve retornar XML válido

- [ ] **Manifest acessível**
  - Acessar: `https://seu-projeto.vercel.app/manifest.json`
  - Deve retornar JSON válido

### Performance
- [ ] **Google Lighthouse**
  - Abrir Chrome DevTools → Lighthouse
  - Rodar audit em modo "Desktop" e "Mobile"
  - Metas:
    - Performance: > 90
    - Accessibility: > 90
    - Best Practices: > 90
    - SEO: > 95

- [ ] **Web Vitals no Vercel**
  - Dashboard → seu projeto → Analytics
  - Verificar Core Web Vitals

### Segurança
- [ ] **Security Headers**
  - Acessar: https://securityheaders.com
  - Testar URL do site
  - Verificar score (meta: A ou A+)

- [ ] **HTTPS ativo**
  - Certificado SSL válido ✅
  - Sem avisos de "Not Secure"

- [ ] **CSP funcionando**
  - Inspecionar console do navegador
  - Sem erros de Content Security Policy

### PWA
- [ ] **Instalável no mobile**
  - Abrir site no Chrome mobile
  - Verificar banner "Adicionar à tela inicial"

- [ ] **Ícones PWA**
  - Verificar se aparecem ao instalar
  - Testar: `https://seu-projeto.vercel.app/icon-192.png`
  - Testar: `https://seu-projeto.vercel.app/icon-512.png`

### Integrações
- [ ] **Supabase conectado**
  - Verificar conexão (se tiver páginas com autenticação)
  - Sem erros no console relacionados ao Supabase

- [ ] **Stripe funcionando**
  - Testar fluxo de pagamento (modo test)
  - Verificar redirecionamentos
  - Confirmar webhooks recebidos no Stripe Dashboard

## 🐛 Troubleshooting Comum

### Build falha
```bash
# Limpar cache e rebuildar
rm -rf .next node_modules
npm install
npm run build
```

### Variáveis de ambiente não carregam
- Verificar nomes (NEXT_PUBLIC_ para variáveis públicas)
- Fazer novo deploy após adicionar variáveis
- Verificar ambiente (Production / Preview / Development)

### Imagens não carregam
- Verificar domínios permitidos em `next.config.ts`
- Verificar paths (usar absolutos: `/image.png`)

### CSP bloqueia recursos
- Verificar console do navegador
- Ajustar CSP em `next.config.ts` se necessário

### Supabase 401 Unauthorized
- Verificar URL e keys corretas
- Confirmar que domínio Vercel está nas Redirect URLs do Supabase

### Stripe webhook não funciona
- Verificar endpoint URL correto
- Verificar webhook secret
- Testar webhooks no Stripe Dashboard

## 📊 Monitoramento Pós-Deploy

### Primeiras 24h
- [ ] Verificar logs na Vercel (Functions → Logs)
- [ ] Monitorar erros no Sentry (se configurado)
- [ ] Verificar analytics (se configurado)

### Primeira semana
- [ ] Google Search Console
  - Adicionar propriedade
  - Verificar indexação
  - Submeter sitemap

- [ ] Performance contínua
  - Verificar Web Vitals no Vercel Analytics
  - Monitorar tempo de resposta

## 🎯 Checklist de Anonimato (Opcional)

Se você seguiu o guia de deploy anônimo:

- [ ] VPN ativa durante todo o processo
- [ ] Email temporário usado (temp-mail.org)
- [ ] Conta GitHub sem informações pessoais
- [ ] Conta Vercel anônima
- [ ] Sem cartão de crédito adicionado
- [ ] WHOIS privacy ativo (se domínio personalizado)

## ✨ Pronto para Produção!

Quando todos os items acima estiverem ✅:

🎉 **Seu site está pronto para receber usuários!**

---

**Links Úteis:**
- Dashboard Vercel: https://vercel.com/dashboard
- Supabase Dashboard: https://app.supabase.com
- Stripe Dashboard: https://dashboard.stripe.com
- Google Search Console: https://search.google.com/search-console
