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
        ReactDOM.render(
          <div>
            <ReactUIDropdown initialItems={response.items}/>
            <ReactUIDropdown
              initialItems={response.items}
              remoteSearch={{url, fields: "domain"}}/>
            <ReactUIDropdown
              initialItems={response.items}
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
