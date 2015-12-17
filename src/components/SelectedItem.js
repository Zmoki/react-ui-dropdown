import React, { Component, PropTypes } from "react";

export default class SelectedItem extends Component {
  get id() {
    return this.props.idPrefix + "selected-item";
  }

  render() {
    return (
      <div className="dropdown-selected-item" id={this.id}>
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
