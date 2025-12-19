# 🚀 Guia de Deploy Anônimo - Vercel

## 📋 Pré-requisitos

- [ ] Email temporário (use [temp-mail.org](https://temp-mail.org))
- [ ] Conta GitHub anônima (opcional, mas recomendado)
- [ ] VPN ativada (para máximo anonimato)

## 🔐 Passo 1: Criar Conta Anônima

### GitHub (Recomendado)
1. Use navegador anônimo/privado
2. Acesse [github.com](https://github.com)
3. Use email temporário do temp-mail.org
4. Nome de usuário genérico (ex: `dev1234567`)
5. **NÃO** adicione informações pessoais

### Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. Escolha "Continue with GitHub" (ou use email temporário)
4. Autorize o Vercel

## 📦 Passo 2: Preparar Repositório

Execute os comandos abaixo no terminal:

```bash
# Navegue até o projeto
cd c:\Users\rptra\OneDrive\Desktop\7\web

# Inicialize o Git (se ainda não foi feito)
git init

# Adicione todos os arquivos
git add .

# Commit inicial
git commit -m "initial commit"

# Crie um repositório no GitHub e conecte
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git branch -M main
git push -u origin main
```

## 🌐 Passo 3: Deploy na Vercel

### Opção A: Via Interface Web (Mais Fácil)

1. **Login na Vercel** → [vercel.com](https://vercel.com)
2. **New Project** → Selecione seu repositório GitHub
3. **Configure as variáveis de ambiente** (ver seção abaixo)
4. **Deploy** → Aguarde ~2 minutos
5. **Pronto!** Seu site estará no ar

### Opção B: Via CLI (Mais Rápido)

```bash
# Instale Vercel CLI globalmente
npm i -g vercel

# Login (use a conta criada)
vercel login

# Deploy em produção
vercel --prod
```

Durante o processo, responda:

- `Set up and deploy "..."?` → **Y**
- `Which scope?` → Sua conta
- `Link to existing project?` → **N**
- `What's your project's name?` → Nome do projeto
- `In which directory is your code located?` → **./web** (ou Enter)
- `Want to override settings?` → **N**

## ⚙️ Passo 4: Configurar Variáveis de Ambiente

### Via Interface Vercel:

1. Acesse seu projeto na Vercel
2. **Settings** → **Environment Variables**
3. Adicione as seguintes variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_publica
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
GEMINI_API_KEY=sua_chave_gemini
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=sua_chave_stripe_publica
STRIPE_SECRET_KEY=sua_chave_stripe_secreta
STRIPE_WEBHOOK_SECRET=seu_webhook_secret
```

### Via CLI:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Cole o valor quando solicitado

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Cole o valor quando solicitado

# Repita para todas as variáveis...
```

> **⚠️ IMPORTANTE**: Após adicionar variáveis, faça um novo deploy:
> ```bash
> vercel --prod
> ```

## 🔧 Passo 5: Configurar Supabase

### Adicionar domínio Vercel ao Supabase:

1. Acesse [app.supabase.com](https://app.supabase.com)
2. Seu Projeto → **Settings** → **API**
3. Role até **URL Configuration**
4. Em **Site URL**, adicione: `https://seu-projeto.vercel.app`
5. Em **Redirect URLs**, adicione:
   - `https://seu-projeto.vercel.app/**`
   - `https://seu-projeto.vercel.app/auth/callback`

## 💳 Passo 6: Configurar Stripe Webhooks

1. Acesse [dashboard.stripe.com](https://dashboard.stripe.com)
2. **Developers** → **Webhooks** → **Add endpoint**
3. **Endpoint URL**: `https://seu-projeto.vercel.app/api/webhooks/stripe`
4. **Events to send**:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copie o **Signing secret** e adicione como `STRIPE_WEBHOOK_SECRET` na Vercel

## ✅ Passo 7: Verificar Deploy

Após o deploy, verifique:

- [ ] Site carrega corretamente: `https://seu-projeto.vercel.app`
- [ ] Login funciona
- [ ] Cadastro funciona
- [ ] Integração Supabase funciona
- [ ] Integração Stripe funciona

## 🐛 Troubleshooting

### Erro de Build
```bash
# Teste o build localmente primeiro
npm run build
```

### Variáveis de ambiente não carregam
- Verifique se os nomes estão corretos
- Faça um novo deploy após adicionar variáveis
- Certifique-se de que variáveis públicas começam com `NEXT_PUBLIC_`

### Erro de CORS no Supabase
- Adicione o domínio Vercel nas configurações do Supabase
- Verifique as Redirect URLs

### Webhook Stripe não funciona
- Verifique o endpoint URL
- Confirme que o `STRIPE_WEBHOOK_SECRET` está correto
- Teste com Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

## 🔒 Máximo Anonimato - Checklist

Para garantir anonimato total:

- [ ] Usou VPN/Tor durante cadastro
- [ ] Email temporário descartável
- [ ] Conta GitHub sem informações pessoais
- [ ] Não adicionou cartão de crédito (use tier gratuito)
- [ ] Domínio personalizado com WHOIS privacy (opcional)
- [ ] Pagamentos em cripto (se necessário upgrade)

## 📊 Limites do Plano Gratuito

- ✅ 100GB de bandwidth por mês
- ✅ Builds ilimitados
- ✅ Domínio `.vercel.app` gratuito
- ✅ SSL automático
- ✅ Deploy preview para cada commit
- ⚠️ Funções serverless: 100GB-horas por mês

## 🎯 Próximos Passos

1. **Domínio Personalizado** (opcional):
   - Compre domínio com cripto em Namecheap
   - Configure DNS na Vercel
   - Ative WHOIS privacy

2. **Monitoramento**:
   - Verifique logs na Vercel
   - Configure alertas de erro
   - Monitore uso de recursos

3. **Atualizações**:
   - Cada `git push` faz deploy automático
   - Preview deployments para branches
   - Rollback fácil se algo der errado

---

**🎉 Pronto! Seu site está no ar de forma anônima!**

Se tiver problemas, verifique os logs em: `https://vercel.com/seu-usuario/seu-projeto/deployments`
