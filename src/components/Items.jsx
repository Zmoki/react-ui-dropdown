import React, { Component, PropTypes } from 'react';

export default class Items extends Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

Items.propTypes = {};
