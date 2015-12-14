import React from "react";
import ReactDOM from "react-dom";
import SexyDropdown from "sexy-dropdown";

let app = {
  run() {
    ReactDOM.render(
      <div>
        <SexyDropdown
          label="Items"
          source="/items-search"
          maxDisplayedItems={5}
          showImages={false}/>
      </div>,
      document.getElementById("root")
    );
  }
};

export default app;

