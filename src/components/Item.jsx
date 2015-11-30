import React, { Component, PropTypes } from 'react';

export default class Item extends Component {
  render() {
    const { image, title, subTitle } = this.props;
    return (
      <div onClick={this.props.onItemClick}>
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
  onItemClick: PropTypes.func
};
