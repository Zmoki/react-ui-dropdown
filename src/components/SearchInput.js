import React, { Component, PropTypes } from "react";

export default class SearchInput extends Component {
  get id() {
    return this.props.idPrefix + "search-input";
  }

  get itemsId() {
    return this.props.idPrefix + "items";
  }

  render() {
    return (
      <input
        className="dropdown-search-input"
        id={this.id}
        value={this.props.value}
        placeholder={this.props.placeholder}
        role="combobox"
        aria-autocomplete="list"
        aria-owns={this.itemsId}
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
