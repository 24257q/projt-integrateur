# SupNum Chatbot

Application de chatbot d'assistance pour l'Institut Supérieur du Numérique.

## Fonctionnalités
- Chatbot bilingue (Français / Arabe)
- Interface d'administration pour gérer les FAQ
- Widget flottant intégré
- Backend API Next.js

## Stack Technique
- Next.js 14 (App Router)
- Tailwind CSS
- Prisma (ORM)
- SQLite (Local Database)

## Installation

1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Préparer la base de données :
   > Note: Si vous rencontrez des problèmes avec Prisma (Exit code 1), assurez-vous que votre environnement Node.js est stable.
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```
3. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

## Utilisation

- **Public** : Accédez à `http://localhost:3000`. Le widget est en bas à droite.
- **Admin** : Accédez à `http://localhost:3000/admin`.
  - Mot de passe démo : `supnum2024`

## Structure
- `src/components/ChatWidget.tsx` : Le composant principale du chatbot.
- `src/app/api/chat/route.ts` : La logique de réponse du bot.
- `src/app/admin/page.tsx` : Le tableau de bord administrateur.

## Problèmes Connus
- La configuration Prisma peut nécessiter `dotenv` en fonction de votre environnement shell. Si `db push` échoue, essayez de configurer `DATABASE_URL` manuellement dans votre terminal.
