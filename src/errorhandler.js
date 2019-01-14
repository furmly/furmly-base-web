const React = require("react");
module.exports = function(e) {
  return React.createElement("p", {}, `error has been handled ${e}`);
};
