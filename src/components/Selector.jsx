import React, { Component, PropTypes } from "react";
import SelectedItem from "./SelectedItem.jsx";

export default class Selector extends Component {
  render() {
    return (
      <div>
        <h1>Selected</h1>
        {this.props.children}
      </div>
    )
  }
}

Selector.propTypes = {};
