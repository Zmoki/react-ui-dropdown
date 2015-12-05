import React from 'react';
import ReactDOM from 'react-dom';
import { APISearchItems, SexyDropdown } from "sexy-dropdown";

let app = {
  run() {
    const items = APISearchItems.getItems();

    ReactDOM.render(
      <div>
        <SexyDropdown
          label="Items"
          items={items}
          maxDisplayedItems={5}
          showImages={false}/>
      </div>,
      document.getElementById('root')
    );
  }
};

export default app;

