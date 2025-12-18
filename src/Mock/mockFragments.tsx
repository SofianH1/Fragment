export const mockFragments = [
  {
    id: "frag_001",
    title: "Idée de projet — PWA offline",
    content: `Faire une PWA 100% offline-first.
- App shell caché via Service Worker
- Données dans IndexedDB
- Zéro backend
- Export JSON manuel`,
    createdAt: "2025-11-02T21:14:00.000Z",
    updatedAt: "2025-11-02T21:14:00.000Z",
    tags: ["dev", "pwa", "offline"],
    collectionId: "col_projects",
    isPinned: true
  },

  {
    id: "frag_002",
    title: "À creuser — IndexedDB",
    content: `IndexedDB :
- Transactions readonly vs readwrite
- Versioning du schema
- Wrapper idb recommandé
- Attention aux migrations silencieuses`,
    createdAt: "2025-11-03T09:42:00.000Z",
    updatedAt: "2025-11-03T10:01:00.000Z",
    tags: ["dev", "indexeddb"],
    collectionId: "col_research",
    isPinned: false
  },

  {
    id: "frag_003",
    title: "Pensée du soir",
    content: `On produit mieux quand on accepte de ne pas tout finir.
Les fragments sont parfois plus honnêtes que les œuvres complètes.`,
    createdAt: "2025-11-04T23:58:00.000Z",
    updatedAt: "2025-11-04T23:58:00.000Z",
    tags: ["journal", "perso"],
    collectionId: "col_journal",
    isPinned: false
  },

  {
    id: "frag_004",
    title: "Checklist — Offline UX",
    content: `✔ L’app démarre sans réseau
✔ Pas de loader bloquant
✔ Feedback visuel quand c’est sauvegardé
✔ Indiquer clairement « stocké localement »`,
    createdAt: "2025-11-05T14:27:00.000Z",
    updatedAt: "2025-11-05T14:35:00.000Z",
    tags: ["ux", "offline"],
    collectionId: "col_design",
    isPinned: true
  },

  {
    id: "frag_005",
    title: "Snippet — Service Worker",
    content: `self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('fragment-shell')
      .then(cache => cache.addAll(['/','/index.html']))
  )
})`,
    createdAt: "2025-11-06T18:02:00.000Z",
    updatedAt: "2025-11-06T18:02:00.000Z",
    tags: ["code", "sw"],
    collectionId: "col_snippets",
    isPinned: false
  }
]
