import React from "react";
export default (name, uid = "", key, element) => {
  if (name == "HIDDEN") {
    return element;
  }
  return React.createElement(
    "div",
    {
      className: `${name.toLowerCase()} ${(uid && uid.toLowerCase()) || ""}`,
      key
    },
    element
  );
};
