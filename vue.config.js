module.exports = {
  outputDir: "static",
  baseUrl: "/static",
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        // modify the options...
        return options;
      });
  },
  pages: {
    index: {
      entry: "src/main.js",
      template: "templates/index.html",
      filename: "index.html",
      title: "Index page",
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
  }
};
