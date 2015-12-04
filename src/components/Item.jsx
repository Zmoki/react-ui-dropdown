import React, { Component, PropTypes } from 'react';

export default class Item extends Component {
  render() {
    const { image, title, subTitle } = this.props;
    const showImages = this.props.showImages !== false;
    return (
      <div className="sd-item" onMouseDown={this.props.handleItemClick}>
        {showImages && image &&
        <img src={image} alt={title}/>}
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
  showImages: PropTypes.bool,
  handleItemClick: PropTypes.func
};
