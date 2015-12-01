import React, { Component, PropTypes } from 'react';

export default class SearchInput extends Component {
  render() {
    return (
      <div>
        <input value={this.props.searchValue} onChange={this.props.onSearchInputChange} />
      </div>
    )
  }
}

SearchInput.propTypes = {
  searchValue: PropTypes.string,
  onSearchInputChange: PropTypes.func
};
