const path = require("path");

module.exports = {
  module: {
    rules: [
      { test: /\.ttf$/, loader: "file-loader?prefix=fonts/" },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, "../"),
        exclude: ["node_modules"]
      }
    ]
  }
};
