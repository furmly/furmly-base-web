const rollup = require("rollup").rollup,
  babel = require("rollup-plugin-babel"),
  resolve = require("rollup-plugin-node-resolve"),
  copy = require("rollup-plugin-copy"),
  path = require("path"),
  package = require("../package.json"),
  input = path.resolve(__dirname, "../src/index.js"),
  output = path.resolve(__dirname, "../dist/bundle.js");
const babelrc = path.join(__dirname, "./.babelrc");

rollup({
  input,
  external: Object.keys(package.dependencies),
  plugins: [
    resolve({ modulesOnly: true }),
    babel({
      exclude: ["node_modules/**", ".storybook/**", "stories/**", "static/**"],
      extends: babelrc
    }),
    copy({
      "src/fonts/": "dist/"
    })
  ]
})
  .then(function(e) {
    console.log("everything rolled up like a g");
    e.write({
      file: output,
      format: "cjs",
      sourcemap: true,
      exports: "named"
    });
  })
  .catch(e => {
    console.log("failed to roll it up:" + e);
  });
