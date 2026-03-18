<div align="center">

# 🧩 Fragment

**A note-taking app that works without internet — and keeps your data on your device.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-rolldown-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![PWA](https://img.shields.io/badge/PWA-offline--first-5A0FC8?style=flat-square&logo=pwa)](https://web.dev/progressive-web-apps/)
[![License: MIT + Commons Clause](https://img.shields.io/badge/License-MIT%20+%20Commons%20Clause-blue?style=flat-square)](LICENSE)


</div>

---

## About

Fragment is an offline-first PWA for taking notes. Each note — called a **Fragment** — is stored directly on your device using IndexedDB. There's no backend, no account to create, and no data sent anywhere.

The idea is simple: notes should be available instantly, work without a connection, and belong entirely to you.

> *Work in progress — core features are functional, more coming soon.*

---

## Features

- Create, edit and delete notes
- All data stored locally (IndexedDB)
- Installable as a PWA — works on desktop and mobile
- No login, no cloud, no tracking

---

## Tech Stack

| Tool | Role |
|------|------|
| React 19 | UI framework |
| TypeScript 5.9 | Type safety |
| Vite (rolldown) | Build tool |
| IndexedDB | Local persistent storage |
| Vite PWA Plugin | Service worker & installability |

---

## Getting Started

```bash
git clone https://github.com/SofianH1/Fragment.git
cd Fragment
npm install
npm run dev
```

---

## Project Structure

```
src/
├── Components/     # UI components
├── hooks/          # Custom React hooks
├── types/          # TypeScript types & interfaces
├── constants/      # App-wide constants
├── Mock/           # Mock data for development
└── App.tsx         # Root component
```

---

## Roadmap

- [x] CRUD on Fragments
- [x] Migrate storage from localStorage to IndexedDB
- [x] Service Worker + PWA manifest
- [ ] Search and filter
- [ ] Markdown support
- [ ] Tags
- [ ] Export (JSON / Markdown)

---

## License

MIT + Commons Clause © [Sofian Hnini](https://github.com/SofianH1)  
Free to use and modify, including commercially. Selling the software itself is not permitted. See [LICENSE](LICENSE) for details.

---
---

<div align="center">

# 🧩 Fragment — Français

**Une application de prise de notes qui fonctionne sans connexion — et garde vos données sur votre appareil.**

</div>

---

## À propos

Fragment est une PWA offline-first pour la prise de notes. Chaque note — appelée un **Fragment** — est stockée directement sur votre appareil via IndexedDB. Aucun backend, aucun compte à créer, aucune donnée envoyée nulle part.

L'idée est simple : les notes doivent être disponibles immédiatement, fonctionner sans connexion, et vous appartenir entièrement.

> *Projet en cours de développement — les fonctionnalités principales sont opérationnelles, d'autres arrivent bientôt.*

---

## Fonctionnalités

- Créer, modifier et supprimer des notes
- Toutes les données stockées en local (IndexedDB)
- Installable en tant que PWA — fonctionne sur desktop et mobile
- Aucune connexion requise, aucun tracking

---

## Stack technique

| Outil | Rôle |
|-------|------|
| React 19 | Framework UI |
| TypeScript 5.9 | Typage statique |
| Vite (rolldown) | Build & dev server |
| IndexedDB | Stockage local persistant |
| Vite PWA Plugin | Service worker & installabilité |

---

## Installation

```bash
git clone https://github.com/SofianH1/Fragment.git
cd Fragment
npm install
npm run dev
```

---

## Structure du projet

```
src/
├── Components/     # Composants UI
├── hooks/          # Hooks React personnalisés
├── types/          # Types & interfaces TypeScript
├── constants/      # Constantes de l'application
├── Mock/           # Données de test
└── App.tsx         # Composant racine
```

---

## Feuille de route

- [x] CRUD sur les Fragments
- [x] Migration localStorage → IndexedDB
- [x] Service Worker + manifest PWA
- [ ] Recherche et filtrage
- [ ] Support Markdown
- [ ] Tags
- [ ] Export (JSON / Markdown)

---


## Licence

MIT + Commons Clause © [Sofian Hnini](https://github.com/SofianH1)  
Libre d'utilisation et de modification, y compris à des fins commerciales. La revente du logiciel est interdite. Voir [LICENSE](LICENSE) pour les détails.
