import React, { Component, PropTypes } from 'react';

export default class SearchInput extends Component {
  render() {
    const { controlId, listId, value, handleInputChange, handleInputFocus  } = this.props;

    return (
      <input className="sd-search-input" id={controlId + "_search"} value={value}
             role="combobox" aria-autocomplete="list" aria-owns={controlId + "_items"}
             onChange={handleInputChange}
             onFocus={handleInputFocus}
             onBlur={handleInputFocus}/>
    )
  }
}

SearchInput.propTypes = {
  controlId: PropTypes.string,
  value: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleInputFocus: PropTypes.func
};
