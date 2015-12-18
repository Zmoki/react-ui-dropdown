"use strict";

import "normalize.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import ReactUIDropdown from "react-ui-dropdown";

const url = "/items-search";

let xhr;
try {
  xhr = new ActiveXObject("Msxml2.XMLHTTP");
} catch(e) {
  try {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  } catch(E) {
    xhr = false;
  }
}
if (!xhr && typeof XMLHttpRequest != "undefined") {
  xhr = new XMLHttpRequest();
}

xhr.open("GET", url, true);

xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      const response = JSON.parse(xhr.responseText);

      if (response.items) {
        const handleDropdownChange = (selectedItems) => {
          console.log(selectedItems);
        };

        ReactDOM.render(
          <div>
            <ReactUIDropdown
              label="Items (local search)"
              initialItems={response.items}
              onChange={handleDropdownChange}/>
            <ReactUIDropdown
              label="Items (local and remote search)"
              initialItems={response.items}
              remoteSearch={{url, fields: "domain"}}/>
            <ReactUIDropdown
              label="Item (no images)"
              initialItems={response.items}
              remoteSearch={{url, fields: "domain"}}
              multiple={false}
              showImages={false}/>
          </div>,
          document.getElementById("root")
        );
      }
    }
  }
};

xhr.send();
