"use strict";

import "normalize.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import ReactUIDropdown from "react-ui-dropdown";

const data = [
  {
    id: 100,
    title: "Centaur",
    image: "https://d30y9cdsu7xlg0.cloudfront.net/png/120146-200.png"
  },
  {
    id: 101,
    title: "Chimera",
    image: "https://d30y9cdsu7xlg0.cloudfront.net/png/120147-200.png"
  },
  {
    id: 102,
    title: "Griffin",
    image: "https://d30y9cdsu7xlg0.cloudfront.net/png/120148-200.png"
  },
  {
    id: 103,
    title: "Winged Unicorn",
    image: "https://d30y9cdsu7xlg0.cloudfront.net/png/120156-200.png"
  },
  {
    id: 104,
    title: "Winged Lion",
    image: "https://d30y9cdsu7xlg0.cloudfront.net/png/120152-200.png"
  }
];

const handleDropdownChange = (selectedItems) => {
  console.log(selectedItems);
};

ReactDOM.render(
  <div>
    <ReactUIDropdown
      label="Myth animals"
      initialItems={data}
      onChange={handleDropdownChange}/>
  </div>,
  document.getElementById("root")
);
