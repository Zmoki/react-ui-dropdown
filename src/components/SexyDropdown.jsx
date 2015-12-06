import React, { Component, PropTypes } from "react";
import Items from "./Items.jsx";
import Item from "./Item.jsx";
import SearchInput from "./SearchInput.jsx";
import SelectedItem from "./SelectedItem.jsx";

import wordsChecker from "./../words-checker";

let idCounter = 0;

function uniqueId(prefix) {
  let id = ++idCounter;

  return prefix + id;
}

export default class SexyDropdown extends Component {
  constructor(props) {
    super(props);

    let maxDisplayedItems = this.props.maxDisplayedItems || 10;
    let items = this.props.items;
    let displayedItems = Object.keys(items).slice(0, maxDisplayedItems);

    this.state = {
      label: this.props.label || "",
      dropdownId: uniqueId('sd-'),
      items,
      maxDisplayedItems,
      displayedItems,
      selectedItems: [],
      searchValue: '',
      multiple: this.props.multiple !== false,
      showImages: this.props.showImages !== false,
      focusedItem: displayedItems[0]
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
      selectedItems: s,
      focusedItem: this.state.displayedItems.filter(itemKey => !~this.state.selectedItems.indexOf(itemKey))[0]
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

    this.setFocusedItem(displayedItems.filter(itemKey => !~this.state.selectedItems.indexOf(itemKey))[0]);
  }

  toggleItems() {
    this.refs.items.toggleHidden(()=> {
      let item = this.refs["item-" + this.state.focusedItem];
      if (item) item.setFocused(true);
    }, ()=> {
      let focusedItem = this.state.focusedItem;
      let item = this.refs["item-" + focusedItem];
      if (item) item.setFocused(false);

      focusedItem = this.state.displayedItems.filter(itemKey => !~this.state.selectedItems.indexOf(itemKey))[0];
      this.setState({
        focusedItem
      });
    });
  }

  setFocusedItem(itemKey) {
    let focusedItem = this.state.focusedItem;
    let item = this.refs["item-" + focusedItem];
    if (item) item.setFocused(false);

    focusedItem = itemKey;
    item = this.refs["item-" + focusedItem];
    if (item) item.setFocused(true);

    this.setState({
      focusedItem
    });
  }

  handleSearchInputKeyStroke(e) {
    let focusedItem = this.state.focusedItem;
    let displayedItems = this.state.displayedItems.filter(itemKey => !~this.state.selectedItems.indexOf(itemKey));
    let focusedItemIndex = displayedItems.indexOf(focusedItem);

    switch (e.key) {
      case "ArrowDown":
        focusedItemIndex = focusedItemIndex < (displayedItems.length - 1) ? (focusedItemIndex + 1) : 0;
        this.setFocusedItem(displayedItems[focusedItemIndex]);
        break;
      case "ArrowUp":
        focusedItemIndex = (focusedItemIndex == 0) ? (displayedItems.length - 1) : (focusedItemIndex - 1);
        this.setFocusedItem(displayedItems[focusedItemIndex]);
        break;
      case "Enter":
        this.addItemToSelected(focusedItem);

        focusedItemIndex = focusedItemIndex < (displayedItems.length - 1) ? (focusedItemIndex + 1) : (focusedItemIndex - 1);
        this.setFocusedItem(displayedItems[focusedItemIndex]);
        break;
    }
  }

  render() {
    const { dropdownId, items, displayedItems, selectedItems, label, searchValue, focusedItem, showImages } = this.state;

    return (
      <div className="sexy-dropdown">
        <label className="sd-label" id={dropdownId + "-label"} htmlFor={dropdownId + "-search"}>
          {label}
        </label>

        <div className="sd-selector">
          {selectedItems.map(itemKey =>
          <SelectedItem key={itemKey} {...items[itemKey]}
                        handleItemClick={this.removeItemFromSelected.bind(this, itemKey)}/>)}

          <SearchInput dropdownId={dropdownId} value={searchValue}
                       handleChange={this.goSearch.bind(this)}
                       handleFocus={this.toggleItems.bind(this)}
                       handleKeyDown={this.handleSearchInputKeyStroke.bind(this)}/>
        </div>

        <Items ref="items" dropdownId={dropdownId} focusedItem={focusedItem}>
          {displayedItems.map(itemKey =>
          <Item ref={"item-" + itemKey} key={itemKey} dropdownId={dropdownId} {...items[itemKey]}
                selected={~selectedItems.indexOf(itemKey)}
                showImages={showImages}
                handleItemClick={this.addItemToSelected.bind(this, itemKey)}
                handleItemHover={this.setFocusedItem.bind(this, itemKey)}/>)}
        </Items>
      </div>
    )
  }
}

SexyDropdown.propTypes = {
  items: PropTypes.object.isRequired,
  maxDisplayedItems: PropTypes.number,
  label: PropTypes.string,
  showImages: PropTypes.bool,
  multiple: PropTypes.bool
};
