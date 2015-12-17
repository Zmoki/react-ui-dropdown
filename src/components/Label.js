import React, { Component, PropTypes } from "react";

export default class Label extends Component {
  get id() {
    return this.props.idPrefix + "label"
  }

  get htmlFor() {
    return this.props.idPrefix + "search-input"
  }

  render() {
    return (
      <label
        className="dropdown-label"
        id={this.id}
        htmlFor={this.htmlFor}>
        {this.props.children}
      </label>
    )
  }
}

Label.propTypes = {
  idPrefix: PropTypes.string.isRequired
};
