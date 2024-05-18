import { defineConfig } from "vite";
import { fileURLToPath, URL } from 'node:url'
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import legacy from '@vitejs/plugin-legacy'
import postCssPxtoRem from 'postcss-pxtorem'
import { VantResolver } from "@vant/auto-import-resolver";


const target = 'https://cn2.manbetx-sports.aisports.io'


export default defineConfig({
    base: '/start/',
    // base: './',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [VantResolver()],
        }),
        Components({
            resolvers: [VantResolver()],
        }),
        legacy({
            targets: ['defaults', 'not IE 11']
        })
    ],
    css: {
        preprocessorOptions: {
            less: {
                math: "always",
            },
        },
        postcss: {
            plugins: [
                postCssPxtoRem({
                    rootValue({ file }: any) {
                        if (file && file.indexOf('vant')>-1) { 
                            return 37.5
                        }
                        if (file && (file.indexOf('pc')>-1 || file.indexOf('swiper')>-1)) { 
                            return 192
                        }
                        return 75
                    },
                    propList: ['*'],
                    selectorBlackList: ['norem',/^\.v-/],
                    exclude: /node_modules/
                })
            ],
        },
    },

    server: {
        proxy: {
            '/api': {
                target,
                changeOrigin: true,
                rewrite:(path)=>path.replace(/^\/api/,'')
            }
        }
    },

    build: {
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
            }
        }
    }
});