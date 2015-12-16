"use strict";

import "normalize.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import ReactUIDropdown from "react-ui-dropdown";


ReactDOM.render(
  <div>
    <ReactUIDropdown
      label="Items"
      placeholder="Input name or domain"
      source={{url: "/items-search", searchIn: "domain"}}
      maxDisplayedItems={5}/>
    <ReactUIDropdown
      label="Items without images"
      placeholder="Input name or domain"
      source={{url: "/items-search", searchIn: "domain"}}
      showImages={false}/>
    <ReactUIDropdown
      label="Item"
      placeholder="Input name or domain"
      source={{url: "/items-search", searchIn: "domain"}}
      multiple={false}
      maxDisplayedItems={3}/>
  </div>,
  document.getElementById("root")
);
