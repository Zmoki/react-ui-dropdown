import React, { Component, PropTypes } from "react";

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected,
      focused: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected != this.state.selected) {
      this.setState({
        selected: nextProps.selected
      });
    }
  }

  setFocused(focused) {
    this.setState({
      focused
    });
  }

  render() {
    const { dropdownId, id, image, title, subTitle, handleItemClick, handleItemHover } = this.props;
    const showImages = this.props.showImages !== false;

    const { selected, focused } = this.state;

    return (
      <div className={`dropdown-item${focused ? " selected": ""}`} id={dropdownId + "-item-" + id} hidden={selected}
           role="option" tabIndex="-1"
           onMouseDown={handleItemClick}
           onMouseMove={handleItemHover}>
        {showImages && image && <img className="dropdown-item-image" src={image} alt={title}/>}
        <div className="dropdown-item-title">{title}</div>
        {subTitle && <div className="dropdown-item-subtitle">{subTitle}</div>}
      </div>
    )
  }
}

Item.propTypes = {
  dropdownId: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  showImages: PropTypes.bool,
  handleItemClick: PropTypes.func.isRequired,
  handleItemHover: PropTypes.func.isRequired
};
