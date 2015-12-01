import React from 'react';
import ReactDOM from 'react-dom';
import { APISearchItems, SexyDropdown } from "sexy-dropdown";

let app = {
  run() {
    const items = APISearchItems.getItems();

    ReactDOM.render(
      <SexyDropdown
        items={items}/>,
      document.getElementById('root')
    );
  }
};

export default app;

