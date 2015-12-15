"use strict";

import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import ReactUIDropdown from "react-ui-dropdown";


ReactDOM.render(
  <div>
    <ReactUIDropdown
      label="Items"
      source={{url: "/items-search", searchIn: "domain"}}
      maxDisplayedItems={5}
      showImages={false}/>
  </div>,
  document.getElementById("root")
);
