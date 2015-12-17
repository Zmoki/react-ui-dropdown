import React, { Component, PropTypes } from "react";

export default class Label extends Component {
  getId() {
    return this.props.idPrefix + "label"
  }

  getInputId() {
    return this.props.idPrefix + "search-input"
  }

  render() {
    return (
      <label
        className="dropdown-label"
        id={this.getId()}
        htmlFor={this.getInputId()}>
        {this.props.children}
      </label>
    )
  }
}

Label.propTypes = {
  idPrefix: PropTypes.string.isRequired
};
