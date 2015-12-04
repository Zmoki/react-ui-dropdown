import React, { Component, PropTypes } from 'react';

export default class SearchInput extends Component {
  render() {
    return (
      <div className="sd-search-input">
        <input
          value={this.props.searchValue}
          onChange={this.props.onSearchInputChange}
          onFocus={this.props.handleSearchInputFocus}
          onBlur={this.props.handleSearchInputFocus}/>
      </div>
    )
  }
}

SearchInput.propTypes = {
  searchValue: PropTypes.string,
  onSearchInputChange: PropTypes.func,
  handleSearchInputFocus: PropTypes.func
};
