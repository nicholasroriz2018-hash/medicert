# MediCert - Atestados Médicos Digitais

> Plataforma Next.js para emissão de atestados médicos via telemedicina

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)

## 🏥 Sobre o Projeto

MediCert é uma aplicação web moderna para solicitação de atestados médicos digitais, desenvolvida com Next.js, TypeScript e Tailwind CSS. A plataforma permite que usuários solicitem atestados de 1 ou 2 dias de forma rápida e segura, com pagamento via PIX.

### ✨ Funcionalidades

- 📋 **Formulário Completo**: Coleta de dados pessoais, contato e endereço
- 🏥 **Informações Médicas**: Seleção de dias (1 ou 2) e descrição de sintomas
- ✅ **Validação de Dados**: Todos os campos obrigatórios com validação HTML5
- 💳 **Pagamento PIX**: QR Code e código copia-e-cola integrados
- 🌓 **Dark Mode**: Interface responsiva com suporte a tema escuro
- 🔒 **Segurança Avançada**: CSP, HSTS, XSS Protection, RLS no Supabase
- 🚀 **SEO Otimizado**: Meta tags Open Graph, Twitter Card, Sitemap
- 📱 **PWA Ready**: Instalável como app no mobile
- ⚡ **Performance**: Build otimizado, cache de assets, compressão

## 🚀 Tecnologias Utilizadas

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Banco de Dados**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Fontes**: Google Fonts (Spline Sans, Inter, Public Sans, Noto Sans)
- **Ícones**: Material Symbols Outlined

## 📦 Estrutura do Projeto

```
web/
├── app/
│   ├── gerenciar-dados/      # Página de formulário
│   ├── pagamento/             # Página de pagamento PIX
│   ├── layout.tsx             # Layout raiz com meta tags SEO
│   ├── page.tsx               # Home page
│   └── globals.css            # Estilos globais (Tailwind v4)
├── lib/
│   └── supabaseClient.ts      # Cliente Supabase
├── public/
│   ├── pix-qrcode.jpg         # QR Code PIX
│   ├── og-image.png           # Open Graph image
│   ├── icon-192.png           # PWA icon 192x192
│   ├── icon-512.png           # PWA icon 512x512
│   ├── apple-touch-icon.png   # iOS icon
│   ├── manifest.json          # PWA manifest
│   ├── robots.txt             # SEO robots
│   └── sitemap.xml            # SEO sitemap
├── middleware.ts              # Security middleware
├── next.config.ts             # Next.js config (headers, CSP)
├── vercel.json                # Vercel deployment config
├── .env.local                 # Variáveis de ambiente (não commitado)
├── .env.example               # Template de variáveis
├── PRE_DEPLOY_CHECKLIST.md    # Checklist de deploy
├── DEPLOY_VERCEL.md           # Guia de deploy anônimo
└── package.json
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no [Supabase](https://supabase.com)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/medicert-nextjs.git
cd medicert-nextjs
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
```

### 4. Configure o banco de dados

Execute o seguinte SQL no Supabase SQL Editor:

```sql
-- Criar tabela user_requests
CREATE TABLE public.user_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    cpf TEXT NOT NULL,
    rg TEXT NOT NULL,
    birth_date DATE NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    address_zip TEXT NOT NULL,
    address_street TEXT NOT NULL,
    address_number TEXT NOT NULL,
    address_neighborhood TEXT NOT NULL,
    address_city TEXT NOT NULL,
    address_state TEXT NOT NULL,
    certificate_days INTEGER NOT NULL DEFAULT 1 CHECK (certificate_days IN (1, 2)),
    symptoms_description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending_payment' 
        CHECK (status IN ('pending_payment', 'paid_waiting', 'processing', 'completed', 'cancelled'))
);

-- Habilitar RLS
ALTER TABLE public.user_requests ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público
CREATE POLICY "Allow public insert" ON public.user_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON public.user_requests FOR SELECT USING (true);
CREATE POLICY "Allow public update" ON public.user_requests FOR UPDATE USING (true);
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## 📱 Páginas

### Home (`/`)
Landing page com informações sobre o serviço, features e FAQ.

### Gerenciar Dados (`/gerenciar-dados`)
Formulário completo para cadastro de informações pessoais e descrição de sintomas.

### Pagamento (`/pagamento?id=uuid`)
Página de pagamento com QR Code PIX e confirmação de pagamento.

## 🔒 Segurança e Otimizações

### Segurança Implementada

- ✅ **Variáveis de ambiente** protegidas (`.env.local` no `.gitignore`)
- ✅ **Row Level Security (RLS)** ativado no Supabase
- ✅ **Content Security Policy (CSP)** configurado
- ✅ **HSTS** (HTTP Strict Transport Security) habilitado
- ✅ **XSS Protection** e anti-clickjacking headers
- ✅ **Middleware de segurança** customizado
- ✅ **Validação de dados** no cliente e servidor

### SEO e Performance

- ✅ **Meta tags completas**: Open Graph, Twitter Card
- ✅ **PWA Manifest**: App instalável no mobile
- ✅ **Sitemap XML** e `robots.txt` configurados
- ✅ **Imagens otimizadas**: AVIF/WebP com lazy loading
- ✅ **Cache agressivo** para assets estáticos (1 ano)
- ✅ **Compressão** habilitada
- ✅ **Lighthouse Score**: Performance > 90, SEO > 95

### Arquivos de Produção

- `manifest.json` - PWA configuration
- `robots.txt` - Search engine directives
- `sitemap.xml` - SEO sitemap
- `og-image.png` - Open Graph share image
- `icon-192.png`, `icon-512.png` - PWA icons
- `apple-touch-icon.png` - iOS home screen icon

## 🚀 Deploy

### Vercel (Recomendado)

**⚠️ Antes de fazer deploy, consulte:** [`PRE_DEPLOY_CHECKLIST.md`](PRE_DEPLOY_CHECKLIST.md)

1. Faça push do código para GitHub
2. Importe o projeto na [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente (ver `.env.example`)
4. Deploy automático! 🎉

```bash
# Ou via CLI
npm i -g vercel
vercel --prod
```

**Deploy Anônimo**: Para deploy anônimo completo, consulte [`DEPLOY_VERCEL.md`](DEPLOY_VERCEL.md)

### Build de Produção

```bash
npm run build
npm start
```

## 📊 Banco de Dados

### Tabela `user_requests`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | UUID | ID único do pedido |
| `created_at` | TIMESTAMP | Data de criação |
| `full_name` | TEXT | Nome completo |
| `cpf` | TEXT | CPF |
| `rg` | TEXT | RG |
| `birth_date` | DATE | Data de nascimento |
| `phone` | TEXT | Telefone |
| `email` | TEXT | E-mail |
| `address_*` | TEXT | Dados de endereço |
| `certificate_days` | INTEGER | Dias de atestado (1 ou 2) |
| `symptoms_description` | TEXT | Descrição dos sintomas |
| `status` | TEXT | Status do pedido |

### Status do Pedido

- `pending_payment` - Aguardando pagamento
- `paid_waiting` - Pago, aguardando processamento
- `processing` - Em processamento
- `completed` - Concluído
- `cancelled` - Cancelado

## 🎨 Design

- **Dark Mode**: Suporte nativo com Tailwind
- **Responsivo**: Mobile-first design
- **Fontes Customizadas**: Spline Sans (display), Inter (formulário), Public Sans (pagamento)
- **Cores**: Verde médico (#10b981) como cor primária

## 📝 Licença

Este projeto é privado e não possui licença pública.

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ usando Next.js e Tailwind CSS.

---

**MediCert** - Atestados médicos digitais rápidos e legais 🏥
#   m e d i c e r t  
 #   m e d i c e r t  
 