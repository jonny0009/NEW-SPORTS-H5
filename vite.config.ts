import path from 'path'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import legacy from '@vitejs/plugin-legacy'
import postCssPxtoRem from 'postcss-pxtorem'
import { VantResolver } from "@vant/auto-import-resolver";


export default defineConfig({
    base: '/start',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
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
                        return file.indexOf('vant') !== -1 ? 37.5 : 75;
                    },
                    propList: ['*'],
                    selectorBlackList: ['norem']
                })
            ]
        },
        devSourcemap: true
    }
});