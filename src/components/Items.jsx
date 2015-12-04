import React, { Component, PropTypes } from 'react';

export default class Items extends Component {
  render() {
    return (
      <div className="sd-items">{this.props.children}</div>
    )
  }
}

Items.propTypes = {};
