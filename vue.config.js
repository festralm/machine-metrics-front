const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        resolve: {
            fallback: {
                "fs": false,
                "path": require.resolve("path-browserify"),
                "os": require.resolve("os-browserify/browser"),
            },
        },
    },
})
