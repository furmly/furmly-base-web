const path = require("path");
const fs = require("fs");
const npmBase = path.join(__dirname, "../node_modules");
const furmlyClient = fs.realpathSync(path.join(npmBase, "furmly-client"));

module.exports = (baseConfig, env, defaultConfig) => {

  defaultConfig.module.rules[0].include.push(furmlyClient);
  const babelRule = defaultConfig.module.rules[0].query;
  babelRule.presets[0] = fs.realpathSync(
    path.join(npmBase, babelRule.presets[0])
  );
  babelRule.plugins = babelRule.plugins.map(x => {
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
