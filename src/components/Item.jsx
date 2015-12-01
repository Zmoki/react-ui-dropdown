import React, { Component, PropTypes } from 'react';

export default class Item extends Component {
  render() {
    const { image, title, subTitle } = this.props;
    return (
      <div onMouseDown={this.props.handleItemClick}>
        <img src={image} />
        <div>{title}</div>
        <div>{subTitle}</div>
      </div>
    )
  }
}

Item.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  handleItemClick: PropTypes.func
};
