"use strict";

import React from "react";
import ReactDOM from "react-dom";
import ReactUIDropdown from "react-ui-dropdown";


ReactDOM.render(
  <div>
    <ReactUIDropdown
      label="Items"
      source="/items-search"
      maxDisplayedItems={5}
      showImages={false}/>
  </div>,
  document.getElementById("root")
);
