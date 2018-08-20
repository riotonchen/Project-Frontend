let path = require("path");
let glob = require("glob");
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
  let entries = {},
    basename,
    tmp,
    pathname,
    appname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    // console.log(entry)
    tmp = entry.split("/").splice(-3);
    console.log(tmp);
    pathname = basename; // 正确输出js和html的路径

    // console.log(pathname)
    entries[pathname] = {
      entry: "src/" + tmp[0] + "/" + tmp[1] + "/" + tmp[1] + ".js",
      template: "src/" + tmp[0] + "/" + tmp[1] + "/" + tmp[2],
      filename: tmp[2]
    };
  });
  console.log(entries);
  return entries;
}

let htmls = getEntry("./src/pages/**/*.html");
// console.log(htmls)
//配置end
module.exports = {
  outputDir: "static",
  baseUrl: "/",
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        // 修改它的选项...
        options.limit = 10000;
        return options;
      });
  },
  pages: htmls,
  devServer: {
    index: "home.html"
  },
};