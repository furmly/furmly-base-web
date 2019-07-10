const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const npmBase = path.join(__dirname, "../node_modules");
const furmlyClient = fs.realpathSync(path.join(npmBase, "furmly-client"));

module.exports = ({ config: defaultConfig }) => {
  defaultConfig.plugins.push(
    new CopyWebpackPlugin([
      { from: "static" },
      {
        from: "stories/fixtures"
      },
      {
        from: "src/fonts"
      }
    ])
  );
  defaultConfig.module.rules[0].include.push(furmlyClient);
  defaultConfig.module.rules[0].exclude = function(modulePath) {
    return (
      /node_modules/i.test(modulePath) &&
      !/node_modules(\/|\\)furmly-client/i.test(modulePath)
    );
  };
  const babelRule = defaultConfig.module.rules[0].use[0];
  babelRule.options.presets[0] = fs.realpathSync(
    path.join(npmBase, babelRule.options.presets[0])
  );
  babelRule.options.plugins = babelRule.options.plugins.map(x => {
    if (typeof x === "object") {
      if (!path.isAbsolute(x[0]))
        x[0] = fs.realpathSync(path.join(npmBase, x[0]));
    } else {
      if (!path.isAbsolute(x)) x = fs.realpathSync(path.join(npmBase, x));
    }
    return x;
  });
  return defaultConfig;
};
