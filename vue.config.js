const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];

let path = require("path");
let glob = require("glob");
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
  let entries = {},
    basename,
    tmp,
    pathname,
    appname;

  glob.sync(globPath).forEach(function(entry) {
    basename = path.basename(entry, path.extname(entry));
    // console.log(entry)
    tmp = entry.split("/").splice(-3);
    console.log(tmp);
    pathname = basename; // 正确输出js和html的路径

    // console.log(pathname)
    entries[pathname] = {
      entry: "src/" + tmp[0] + "/" + tmp[1] + "/" + tmp[1] + ".js",
      template: "src/" + tmp[0] + "/" + tmp[1] + "/" + tmp[2],
      title: tmp[2],
      filename: tmp[2]
    };
  });
  return entries;
}

let pages = getEntry("./src/pages/**?/*.html");
console.log(pages);
//配置end

module.exports = {
  baseUrl: "/",
  outputDir: "static",
  productionSourceMap: true,
  pages,
  devServer: {
    index: "home.html", //默认启动serve 打开page1页面
    open: process.platform === "darwin",
    host: "",
    port: 8088,
    https: false,
    hotOnly: false
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  }
};
