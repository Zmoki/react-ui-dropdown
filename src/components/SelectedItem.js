import React, { Component, PropTypes } from "react";

export default class SelectedItem extends Component {
  getId() {
    return this.props.idPrefix + "selected-item";
  }

  render() {
    return (
      <div className="dropdown-selected-item" id={this.getId()}>
        <span className="dropdown-item-title">{this.props.title}</span>
        <button
          className="dropdown-item-close"
          type="button"
          onClick={this.props.onClick}>{String.fromCharCode(215)}</button>
      </div>
    )
  }
}

SelectedItem.propTypes = {
  idPrefix: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
