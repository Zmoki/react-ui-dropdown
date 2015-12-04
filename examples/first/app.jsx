import React from 'react';
import ReactDOM from 'react-dom';
import { APISearchItems, SexyDropdown } from "sexy-dropdown";

let app = {
  run() {
    const items = APISearchItems.getItems();

    ReactDOM.render(
      <div>
        <SexyDropdown
          items={items}
          maxDisplayedItems={5}
          showImages={false}/>
        <SexyDropdown
          items={items}
          maxDisplayedItems={2}
          multiple={false}/>
      </div>,
      document.getElementById('root')
    );
  }
};

export default app;

