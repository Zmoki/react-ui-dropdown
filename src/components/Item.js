import React, { Component, PropTypes } from "react";

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false
    }
  }

  getId() {
    return this.props.idPrefix + "item-" + this.props.id;
  }

  getClassName() {
    return `dropdown-item${this.state.focused ? " selected" : ""}`
  }

  hasImages() {
    return this.props.showImages && !!this.props.image;
  }

  hasSubtitle() {
    return !!this.props.subtitle;
  }

  setFocused(value) {
    this.setState({
      focused: !!value
    });
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        id={this.getId()}
        hidden={this.props.selected}
        style={this.props.selected ? { display: "none"} : {}}
        role="option"
        tabIndex="-1"
        onMouseDown={this.props.onClick}
        onMouseMove={this.props.onHover}>
        {this.hasImages()
        && <img
          className="dropdown-item-image"
          src={this.props.image}
          alt=""/>}
        <div className="dropdown-item-title">
          {this.props.title}
          {this.hasSubtitle()
          && <div className="dropdown-item-subtitle">{this.props.subTitle}</div>}
        </div>
      </div>
    )
  }
}

Item.propTypes = {
  idPrefix: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  showImages: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired
};
Item.defaultProps = {
  selected: false,
  showImages: true
};
