import React, { Component } from 'react';

export default class Item extends Component {
  render() {
    const { id, image, title, subtitle } = this.props;
    return (
      <div>
        <img src={image} />
        <div>{title}</div>
        <div>{id}</div>
      </div>
    )
  }
}
