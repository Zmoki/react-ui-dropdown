import React, { Component, PropTypes } from 'react';

export default class SelectedItem extends Component {
  render() {
    const { title, handleItemClick } = this.props;

    return (
      <div className="sd-selected-item">
        <span className="sd-title">{title}</span>
        <button className="close" onClick={handleItemClick}>×</button>
      </div>
    )
  }
}

SelectedItem.propTypes = {
  title: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired
};
