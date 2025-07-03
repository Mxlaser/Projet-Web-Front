# Frontend EFREI - Gestion de Documents

Frontend Next.js 15 sécurisé pour l'application de gestion de documents EFREI.

## 🚀 Fonctionnalités

- **Authentification sécurisée** avec JWT
- **Gestion des rôles** (ADMIN, USER)
- **Interface moderne** avec Tailwind CSS
- **Protection des routes** automatique
- **Notifications** en temps réel
- **Gestion des documents** (CRUD)

## 🛠️ Technologies

- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **Axios** - Client HTTP
- **React Hook Form** - Gestion des formulaires
- **Zod** - Validation des données

## 📦 Installation

1. **Installer les dépendances :**

```bash
cd frontend
yarn install
```

2. **Configurer l'environnement :**
   Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

3. **Démarrer le serveur de développement :**

```bash
yarn dev
```

L'application sera accessible sur `http://localhost:3000`

## 🔐 Sécurité

### Authentification

- **JWT Tokens** stockés dans localStorage
- **Intercepteurs Axios** pour ajouter automatiquement les tokens
- **Redirection automatique** vers `/login` si non authentifié
- **Gestion des erreurs 401** avec déconnexion automatique

### Protection des Routes

- **Composant `ProtectedRoute`** pour protéger les pages
- **Vérification des rôles** pour l'accès aux fonctionnalités
- **Loading states** pendant la vérification d'authentification

### Headers de Sécurité

- **X-Frame-Options: DENY**
- **X-Content-Type-Options: nosniff**
- **Referrer-Policy: origin-when-cross-origin**

## 📁 Structure du Projet

```
src/
├── app/                    # Pages Next.js 13+
│   ├── dashboard/         # Dashboard protégé
│   ├── login/            # Page de connexion
│   ├── register/         # Page d'inscription
│   └── layout.tsx        # Layout principal
├── components/
│   ├── ui/               # Composants UI réutilisables
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Toaster.tsx
│   └── ProtectedRoute.tsx # Protection des routes
├── contexts/
│   └── AuthContext.tsx   # Contexte d'authentification
├── lib/
│   └── api.ts           # Service API sécurisé
└── types/
    └── index.ts         # Types TypeScript
```

## 🔧 Configuration

### API Service

Le service API (`src/lib/api.ts`) gère :

- **Configuration Axios** avec base URL
- **Intercepteurs** pour l'authentification
- **Gestion des erreurs** automatique
- **Types TypeScript** pour toutes les requêtes

### Contexte d'Authentification

Le contexte (`src/contexts/AuthContext.tsx`) fournit :

- **État utilisateur** global
- **Fonctions de login/logout**
- **Persistance** des données d'authentification
- **Vérification** automatique du token

## 🚀 Déploiement

### Production

```bash
yarn build
yarn start
```

### Docker

```bash
docker build -t efrei-frontend .
docker run -p 3000:3000 efrei-frontend
```

## 🔗 Connexion au Backend

Le frontend se connecte au backend NestJS sur le port 4000 avec :

- **URL configurable** via `NEXT_PUBLIC_API_URL`
- **CORS** géré par le backend
- **Authentification JWT** sécurisée
- **Gestion des erreurs** robuste

## 📝 API Endpoints Utilisés

- `POST /auth/login` - Connexion
- `POST /auth/register` - Inscription
- `GET /auth/me` - Informations utilisateur
- `GET /documents` - Liste des documents
- `POST /documents` - Créer un document
- `DELETE /documents/:id` - Supprimer un document

## 🎨 Interface Utilisateur

- **Design responsive** avec Tailwind CSS
- **Composants réutilisables** et accessibles
- **Notifications toast** pour le feedback utilisateur
- **Loading states** pour une meilleure UX
- **Gestion d'erreurs** intuitive

## 🔒 Bonnes Pratiques de Sécurité

1. **Validation côté client** avec Zod
2. **Sanitisation** des données d'entrée
3. **Gestion sécurisée** des tokens JWT
4. **Protection CSRF** via headers
5. **Redirection sécurisée** après authentification
6. **Gestion des sessions** côté client

## 🐛 Débogage

### Erreurs Courantes

- **CORS** : Vérifier que le backend autorise `localhost:3000`
- **JWT** : Vérifier la validité du token
- **API** : Vérifier que le backend est démarré sur le port 4000

### Logs

Les erreurs sont affichées dans :

- **Console navigateur** pour les erreurs client
- **Notifications toast** pour les erreurs utilisateur
- **Console serveur** pour les erreurs Next.js
