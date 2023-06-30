import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    // macの場合、serverは不要
    server: {
        host: true, // hostを決める必要がある
        hmr: {
            host: "localhost", //windows & wsl2の環境だとhostを指定する必要がある
        },
    },
    plugins: [
        laravel({
            input: ["resources/ts/app.tsx"],
            refresh: true,
        }),
        react(),
    ],
});
