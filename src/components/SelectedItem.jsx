import React, { Component, PropTypes } from 'react';

export default class SelectedItem extends Component {
  render() {
    const { title } = this.props;

    return (
      <div>{title}</div>
    )
  }
}

SelectedItem.propTypes = {
  title: PropTypes.string
};
