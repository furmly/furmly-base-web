const path = require("path");

module.exports = {
  module: {
    rules: [
      { test: /\.ttf$/, loader: "file-loader?prefix=fonts/" }
    ]
  }
};
