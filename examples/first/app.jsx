import React from 'react';
import ReactDOM from 'react-dom';
import { DDItem } from "sexy-dropdown";

let app = {
  run() {
    ReactDOM.render(
      <DDItem />,
      document.getElementById('root')
    );
  }
};

export default app;

