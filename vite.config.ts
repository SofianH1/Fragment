import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { VitePWA } from "vite-plugin-pwa"


// https://vite.dev/config/
export default defineConfig({
    plugins: [react(),
    VitePWA({
        registerType: "autoUpdate",
        manifest: {
            name: "Fragment",
            short_name: "Fragment",
            description: "Offline-first note-taking app",
            theme_color: "#112A46",
            background_color: "#fcf8f5",
            display: "standalone",
            icons: [
                { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
                { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" },
            ],
        }
    })],
    base:"/Fragment/",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        }
    }
})
