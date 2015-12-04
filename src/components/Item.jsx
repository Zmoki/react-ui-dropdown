import React, { Component, PropTypes } from 'react';

export default class Item extends Component {
  render() {
    const { image, title, subTitle } = this.props;
    const showImages = this.props.showImages !== false;
    return (
      <div onMouseDown={this.props.handleItemClick}>
        {showImages && image &&
        <img src={image}/>}
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
  showImages: PropTypes.boolean,
  handleItemClick: PropTypes.func
};
