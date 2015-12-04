import React, { Component, PropTypes } from "react";
import SelectedItem from "./SelectedItem.jsx";
import SearchInput from "./SearchInput.jsx";

export default class Selector extends Component {
  render() {
    return (
      <div className="sd-selector">
        {this.props.children}
        <SearchInput
          searchValue={this.props.searchValue}
          onSearchInputChange={this.props.handleChangeSearchValue}
          handleSearchInputFocus={this.props.handleSearchInputFocus}/>
      </div>
    )
  }
}

Selector.propTypes = {
  searchValue: PropTypes.string,
  handleChangeSearchValue: PropTypes.func
};
