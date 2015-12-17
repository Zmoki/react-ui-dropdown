import React, { Component, PropTypes } from "react";

export default class SearchInput extends Component {
  getId() {
    return this.props.idPrefix + "search-input";
  }

  getItemsId() {
    return this.props.idPrefix + "items";
  }

  render() {
    return (
      <input
        ref="input"
        className="dropdown-search-input"
        id={this.getId()}
        value={this.props.value}
        placeholder={this.props.placeholder}
        role="combobox"
        aria-autocomplete="list"
        aria-owns={this.getItemsId()}
        onChange={this.props.onChange}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onKeyDown={this.props.onKeyDown}/>
    )
  }
}

SearchInput.propTypes = {
  idPrefix: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired
};
SearchInput.defaultProps = {
  value: "",
  placeholder: ""
};
