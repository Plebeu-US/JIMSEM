# JIMSEM — $JIMSEM

Landing page meme totalmente cartoonizada para o personagem JIMSEM, construída com Next.js, React e TypeScript.

## O que foi feito

- Navbar personalizada com logo corrigido, ticker animado e links para X e Telegram.
- Hero responsivo com ilustração original e identidade visual estilo quadrinhos.
- Seções de incidente, anatomia, aquisição, roadmap e comunidade.
- Galeria com JIMSEM em habitats aleatórios de animais.
- Ilustrações exclusivas para o hero, navbar, seções e compartilhamento social.
- Layout adaptado para iPhone, tablet e desktop.
- Links e contrato permanecem como “coming soon” enquanto não forem configurados.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Build

```bash
npm run lint
npm test
npm run build
```

## Variáveis para a Vercel

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_X_URL=
NEXT_PUBLIC_TELEGRAM_URL=
NEXT_PUBLIC_CONTRACT_ADDRESS=
```

Os arquivos principais estão em `app/` e as imagens em `public/assets/`.
