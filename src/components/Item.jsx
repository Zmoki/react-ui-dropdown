import React, { Component, PropTypes } from 'react';

export default class Item extends Component {
  render() {
    const { image, title, subTitle, handleItemClick } = this.props;
    const showImages = this.props.showImages !== false;

    return (
      <li className="sd-item" role="option"
          onMouseDown={handleItemClick}>
        {showImages && image &&
        <img src={image} alt={title}/>}
        <span>{title}</span>
        <span>{subTitle}</span>
      </li>
    )
  }
}

Item.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  showImages: PropTypes.bool,
  handleItemClick: PropTypes.func
};
