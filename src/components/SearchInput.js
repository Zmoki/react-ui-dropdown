import React, { Component, PropTypes } from "react";

export default class SearchInput extends Component {
  render() {
    const { dropdownId, value, handleChange, handleFocus, handleKeyDown  } = this.props;

    return (
      <input className="sd-search-input" id={dropdownId + "-search"} value={value}
             role="combobox" aria-autocomplete="list" aria-owns={dropdownId + "-items"}
             onChange={handleChange}
             onFocus={handleFocus}
             onBlur={handleFocus}
             onKeyDown={handleKeyDown}/>
    )
  }
}

SearchInput.propTypes = {
  dropdownId: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired
};
