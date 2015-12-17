import React, { Component, PropTypes } from "react";

export default class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true
    }
  }

  getId() {
    return this.props.idPrefix + "items";
  }

  getFocusedItemId() {
    return this.props.focusedItem ? this.props.idPrefix + "item-" + this.props.focusedItem : "";
  }

  setHidden(value) {
    this.setState({
      hidden: !!value
    });
  }

  render() {
    return (
      <div
        className="dropdown-items"
        id={this.getId()}
        hidden={this.state.hidden}
        style={this.state.hidden ? { display: "none"} : {}}
        role="listbox"
        tabIndex="-1"
        aria-activedescendant={this.getFocusedItemId()}>
        {this.props.children}
      </div>
    )
  }
}

Items.propTypes = {
  idPrefix: PropTypes.string.isRequired,
  focusedItem: PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ])
};
