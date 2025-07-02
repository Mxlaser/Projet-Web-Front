# Frontend - Gestion de Documents

Application Next.js 15 pour la gestion de documents avec authentification.

## Technologies utilisées

- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **React Hook Form** - Gestion des formulaires
- **Zod** - Validation des données
- **Axios** - Client HTTP
- **Lucide React** - Icônes
- **Radix UI** - Composants UI

## Fonctionnalités

- ✅ Authentification (connexion/inscription)
- ✅ Gestion des documents (upload, visualisation, suppression)
- ✅ Interface responsive
- ✅ Gestion des rôles (ADMIN/USER)
- ✅ Upload de fichiers

## Développement local

### Prérequis

- Node.js 22
- Yarn

### Installation

```bash
# Installer les dépendances
yarn install

# Lancer en mode développement
yarn dev
```

L'application sera accessible sur `http://localhost:3001`

### Variables d'environnement

Créez un fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Scripts disponibles

```bash
yarn dev          # Développement
yarn build        # Build de production
yarn start        # Démarrer en production
yarn lint         # Linter
```

## Structure du projet

```
src/
├── app/                 # Pages Next.js 13+ (App Router)
│   ├── dashboard/       # Page dashboard
│   ├── login/          # Page de connexion
│   ├── register/       # Page d'inscription
│   └── layout.tsx      # Layout principal
├── components/         # Composants réutilisables
│   └── ui/            # Composants UI de base
├── contexts/          # Contextes React
├── lib/               # Utilitaires et services
└── types/             # Types TypeScript
```

## Déploiement

### Docker

```bash
# Build de l'image
docker build -t frontend .

# Lancer le conteneur
docker run -p 3001:3000 frontend
```

### Avec docker-compose

```bash
# Lancer tous les services
docker-compose up -d

# Frontend accessible sur http://localhost:3001
```

## API Backend

Le frontend communique avec l'API NestJS sur le port 3000. Assurez-vous que le backend est démarré avant de lancer le frontend.

## Tests

```bash
# Tests unitaires
yarn test

# Tests e2e
yarn test:e2e
```
