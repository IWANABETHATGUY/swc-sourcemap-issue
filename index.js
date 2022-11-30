const swc = require("@swc/core");
const fs = require("fs");
const path = require("path");
const code = fs.readFileSync("./test.js").toString();

const config = {
  compress: {},
  sourceMap: true,
  mangle: true,
  ecma: 5,
};
async function main() {
  let res = await swc.transformFile("./test.js", {
    sourceMaps: true,
    jsc: {
      parser: {
        syntax: "ecmascript",
        jsx: false,
      },
      target: "es5",
      loose: false,
      minify: {
        compress: false,
        mangle: false,
      },
    },
    module: {
      type: "commonjs",
    },
    minify: true,
    isModule: true,
  });
  // console.log(res)
  // let res = await swc.minify(code, config)
  fs.writeFileSync(path.resolve(__dirname, "./a.js"), res.code);
  fs.writeFileSync(path.resolve(__dirname, "./a.js.map"), res.map);
  // res.code
}
main();
