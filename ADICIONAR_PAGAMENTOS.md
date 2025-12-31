# Como Adicionar QR Codes e Códigos PIX

> Este guia mostra como substituir os placeholders pelos dados reais de pagamento.

## 📋 Índice

1. [Gerar QR Codes e Códigos PIX](#gerar-qr-codes)
2. [Adicionar Imagens](#adicionar-imagens)
3. [Atualizar Códigos PIX](#atualizar-códigos-pix)
4. [Testar](#testar)

---

## 🔐 Gerar QR Codes e Códigos PIX

### Valores necessários:

- **R$ 49,90** para 3-5 dias
- **R$ 69,90** para 6-7 dias

### Como gerar:

1. Acesse seu banco/plataforma de pagamentos
2. Crie um **PIX estático** ou **QR Code de cobrança**
3. Defina o valor fixo (R$ 49,90 ou R$ 69,90)
4. Gere o **QR Code** (imagem) e o **PIX Copia e Cola** (código)
5. Salve ambos

> **Dica**: Alguns bancos permitem criar múltiplos QR codes com valores diferentes. Use essa funcionalidade se disponível.

---

## 🖼️ Adicionar Imagens

### Passo 1: Renomear imagens

Renomeie seus QR codes baixados para:
- `pix-qrcode-49.jpg` (para R$ 49,90)
- `pix-qrcode-69.jpg` (para R$ 69,90)

### Passo 2: Mover para pasta public

Copie as imagens para a pasta `public/` do projeto:

```
c:\Users\rptra\OneDrive\Desktop\7\web\public\
  ├── pix-qrcode.jpg        (R$ 29,90 - já existe)
  ├── pix-qrcode-49.jpg     ← ADICIONE AQUI
  └── pix-qrcode-69.jpg     ← ADICIONE AQUI
```

---

## 💻 Atualizar Códigos PIX

### Abrir arquivo

Abra: `c:\Users\rptra\OneDrive\Desktop\7\web\app\pagamento\page.tsx`

### Encontrar a seção paymentData

Procure por **linha 14-29** (aproximadamente):

```typescript
const paymentData: Record<number, { qrCode: string; pixCode: string; daysRange: string }> = {
    29.90: {
        qrCode: '/pix-qrcode.jpg',
        pixCode: '00020126580014br.gov.bcb.pix...',
        daysRange: '1-2 dias'
    },
    49.90: {
        qrCode: '/pix-qrcode-49.jpg',
        pixCode: 'PLACEHOLDER_PIX_49_90', // ← SUBSTITUIR AQUI
        daysRange: '3-5 dias'
    },
    69.90: {
        qrCode: '/pix-qrcode-69.jpg',
        pixCode: 'PLACEHOLDER_PIX_69_90', // ← SUBSTITUIR AQUI
        daysRange: '6-7 dias'
    }
};
```

### Substituir os placeholders

**Para R$ 49,90:**
```typescript
pixCode: 'SEU_CODIGO_PIX_COMPLETO_AQUI'
```

**Para R$ 69,90:**
```typescript
pixCode: 'SEU_CODIGO_PIX_COMPLETO_AQUI'
```

### Exemplo de código PIX válido:

Um código PIX copia e cola se parece com isso:
```
00020126580014br.gov.bcb.pix0136b354ecac-bbc2-47b5-bc5e-3b01855799cd520400005303986540549.905802BR5925SEU NOME6009Sao Paulo62290525ABC123456789012345678630475B5
```

> **Importante**: 
> - Cole o código **COMPLETO**, sem espaços ou quebras de linha
> - O código deve estar entre aspas simples `'...'`
> - Não modifique o código de forma alguma

---

## ✅ Testar

### Teste local:

1. Rode o servidor de desenvolvimento:
```powershell
cd c:\Users\rptra\OneDrive\Desktop\7\web
npm run dev
```

2. Acesse: http://localhost:3000/gerenciar-dados

3. Teste cada faixa de dias:
   - Selecione "3 dias - R$ 49,90"
   - Preencha os campos obrigatórios
   - Clique em "Salvar Alterações"
   - Verifique se a página de pagamento mostra:
     - ✅ Preço correto (R$ 49,90)
     - ✅ QR code da imagem `pix-qrcode-49.jpg`
     - ✅ PIX copia e cola correto
     - ✅ Texto "3-5 dias"

4. Repita para "6 dias - R$ 69,90"

### Teste de cópia do código:

1. Na página de pagamento, clique no campo "PIX Copia e Cola"
2. Deve aparecer o alerta: "Código PIX copiado!"
3. Cole em um bloco de notas para verificar se o código está correto

---

## 🚀 Deploy

Após testar localmente e confirmar que tudo funciona:

```powershell
cd c:\Users\rptra\OneDrive\Desktop\7\web
git add .
git commit -m "feat: adiciona pagamentos de 49,90 e 69,90"
git push
```

A Vercel vai fazer deploy automático em ~2 minutos.

---

## 🔍 Troubleshooting

### QR code não aparece

**Problema**: Imagem com nome errado ou na pasta errada.

**Solução**:
- Verifique se o arquivo está em `public/pix-qrcode-49.jpg`
- O nome deve ser **EXATAMENTE** `pix-qrcode-49.jpg` (minúsculas)
- Reinicie o servidor (`Ctrl+C` e depois `npm run dev`)

### Código PIX não copia

**Problema**: Placeholder ainda está no código.

**Solução**:
- Abra `app/pagamento/page.tsx`
- Procure por `PLACEHOLDER_PIX`
- Substitua pelo código real

### Preço errado na URL

**Problema**: Mapeamento de dias incorreto.

**Solução**: 
- Verifique a função `getPriceByDays()` em `app/gerenciar-dados/page.tsx`
- Os ranges devem ser:
  - 1-2 dias → 29.90
  - 3-5 dias → 49.90
  - 6-7 dias → 69.90

---

## 📞 Suporte

Se tiver dúvidas, me chame com o código PIX e QR code que você gerou e eu ajudo a configurar!
