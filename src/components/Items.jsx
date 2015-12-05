import React, { Component, PropTypes } from 'react';

export default class Items extends Component {
  render() {
    const { controlId, hidden } = this.props;

    return (
      <ul className="sd-items" id={controlId + "_items"} hidden={hidden}
          role="listbox">
        {this.props.children}
      </ul>
    )
  }
}

Items.propTypes = {
  controlId: PropTypes.string,
  hidden: PropTypes.bool
};
