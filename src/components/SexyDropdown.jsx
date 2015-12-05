import React, { Component, PropTypes } from "react";
import Items from "./Items.jsx";
import Item from "./Item.jsx";
import SearchInput from "./SearchInput.jsx";
import SelectedItem from "./SelectedItem.jsx";

import wordsChecker from "./../words-checker";

import { uniqueId } from "lodash";

export default class SexyDropdown extends Component {
  constructor(props) {
    super(props);

    let maxDisplayedItems = this.props.maxDisplayedItems || 10;
    let items = this.props.items;
    let displayedItems = Object.keys(items).slice(0, maxDisplayedItems);

    this.state = {
      label: this.props.label || "",
      controlId: uniqueId('sd_'),
      items,
      maxDisplayedItems,
      displayedItems,
      selectedItems: [],
      searchValue: '',
      showDisplayedItems: false,
      multiple: this.props.multiple !== false,
      showImages: this.props.showImages !== false
    };
  }

  addItemToSelected(itemKey) {
    let s;
    if (this.state.multiple) {
      s = this.state.selectedItems;

      s.push(itemKey);
    } else {
      s = [itemKey];
    }

    this.setState({
      selectedItems: s
    });
  }

  removeItemFromSelected(itemKey) {
    let s = this.state.selectedItems;

    s.splice(s.indexOf(itemKey), 1);

    this.setState({
      selectedItems: s
    });
  }

  goSearch(e) {
    let displayedItems;
    if (!e.target.value) {
      displayedItems = Object.keys(this.state.items).slice(0, this.state.maxDisplayedItems);
    } else {
      displayedItems = [];
      let words = wordsChecker.getConditionalWords(e.target.value);

      for (let itemKey in this.state.items) {
        let item = this.state.items[itemKey];

        loopFields:
          for (let field in item) {
            if (typeof item[field] == "string") {
              let value = item[field].toLowerCase();

              for (let i = 0; i < words.length; i++) {
                if (~value.search(words[i])) {
                  displayedItems.push(itemKey);
                  break loopFields;
                }
              }
            }
          }
      }
      displayedItems = displayedItems.slice(0, this.state.maxDisplayedItems);
    }

    this.setState({
      searchValue: e.target.value,
      displayedItems
    });
  }

  toggleItems() {
    let showDisplayedItems = this.state.showDisplayedItems;

    showDisplayedItems = !showDisplayedItems;

    this.setState({
      showDisplayedItems
    });
  }

  render() {
    const { items, displayedItems, selectedItems, label, controlId } = this.state;

    return (
      <div className="sexy-dropdown">
        <label className="sd-label" id={controlId + "_label"} htmlFor={controlId + "_search"}>
          {label}
        </label>

        <div className="sd-selector">
          {selectedItems.map(itemKey =>
          <SelectedItem key={itemKey}
            {...items[itemKey]}
            handleItemClick={this.removeItemFromSelected.bind(this, itemKey)}/>)}

          <SearchInput controlId={controlId}
            value={this.props.searchValue}
            handleInputChange={this.goSearch.bind(this)}
            handleInputFocus={this.toggleItems.bind(this)}/>
        </div>

        <Items controlId={controlId} hidden={!this.state.showDisplayedItems}>
          {displayedItems.filter(itemKey => !~selectedItems.indexOf(itemKey)).map(itemKey =>
          <Item key={itemKey}
            {...items[itemKey]}
            showImages={this.state.showImages}
            handleItemClick={this.addItemToSelected.bind(this, itemKey)}/>)}
        </Items>
      </div>
    )
  }
}

SexyDropdown.propTypes = {
  items: PropTypes.object,
  maxDisplayedItems: PropTypes.number,
  multiple: PropTypes.bool,
  showImages: PropTypes.bool
};
