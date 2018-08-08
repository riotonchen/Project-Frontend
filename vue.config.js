module.exports = {
    outputDir: 'static',
    baseUrl: '/static',
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                // modify the options...
                return options
            })
    }
}