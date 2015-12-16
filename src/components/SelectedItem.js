import React, { Component, PropTypes } from "react";

export default class SelectedItem extends Component {
  render() {
    const { title, handleItemClick } = this.props;

    return (
      <div className="dropdown-selected-item">
        <span className="dropdown-item-title">{title}</span>
        <button className="dropdown-item-close" type="button" onClick={handleItemClick}>&#215;</button>
      </div>
    )
  }
}

SelectedItem.propTypes = {
  title: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired
};
