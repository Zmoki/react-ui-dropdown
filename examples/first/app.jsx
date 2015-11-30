import React from 'react';
import ReactDOM from 'react-dom';
import { APISearchItems, SexyDropdown } from "sexy-dropdown";

let app = {
  run() {
    const items = APISearchItems.getItems("Иван", 10);
    const selectedItems = [];

    ReactDOM.render(
      <SexyDropdown
        items={items}
        selectedItems={selectedItems}/>,
      document.getElementById('root')
    );
  }
};

export default app;

