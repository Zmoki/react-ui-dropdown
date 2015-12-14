import React, { Component, PropTypes } from "react";

export default class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true
    }
  }

  toggleHidden(handleShow, handleHidden) {
    let hidden = !this.state.hidden;

    if (!hidden) {
      handleShow();
    } else {
      handleHidden();
    }

    this.setState({
      hidden: hidden
    });
  }

  render() {
    const { dropdownId, focusedItem } = this.props;

    return (
      <div className="dropdown-items" id={dropdownId + "-items"} hidden={this.state.hidden}
           role="listbox" tabIndex="-1" aria-activedescendant={focusedItem && dropdownId + "-item-" + focusedItem}>
        {this.props.children}
      </div>
    )
  }
}

Items.propTypes = {
  dropdownId: PropTypes.string.isRequired,
  focusedItem: PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ])
};
