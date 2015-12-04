import React, { Component, PropTypes } from "react";
import Items from "./Items.jsx";
import Item from "./Item.jsx";
import Selector from "./Selector.jsx";
import SelectedItem from "./SelectedItem.jsx";

import wordsChecker from "./../words-checker";

export default class SexyDropdown extends Component {
  constructor(props) {
    super(props);

    let maxDisplayedItems = this.props.maxDisplayedItems || 10;
    let items = this.props.items;
    let displayedItems = Object.keys(items).slice(0, maxDisplayedItems);

    this.state = {
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
    if(this.state.multiple) {
      s = this.state.selectedItems;

      s.push(itemKey);
    } else{
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

  toggleItems(){
    let showDisplayedItems = this.state.showDisplayedItems;

    showDisplayedItems = !showDisplayedItems;

    this.setState({
      showDisplayedItems
    });
  }

  render() {
    const { items, displayedItems, selectedItems } = this.state;

    return (
      <div>
        <Selector
          searchValue={this.state.searchValue}
          handleChangeSearchValue={this.goSearch.bind(this)}
          handleSearchInputFocus={this.toggleItems.bind(this)}>
          {
            selectedItems.map(itemKey => {
              let item = items[itemKey];

              return (
              <SelectedItem
                key={item.id}
                {...item}
                onSelectedItemClick={this.removeItemFromSelected.bind(this, itemKey)}/>);
              })
            }
        </Selector>

        {this.state.showDisplayedItems &&
        <Items>
          {displayedItems.filter(itemKey => !~selectedItems.indexOf(itemKey)).map(itemKey =>
          <Item
            {...items[itemKey]}
            key={itemKey}
            showImages={this.state.showImages}
            handleItemClick={this.addItemToSelected.bind(this, itemKey)}/>)}
        </Items>}
      </div>
    )
  }
}

SexyDropdown.propTypes = {
  items: PropTypes.object,
  maxDisplayedItems: PropTypes.number,
  multiple: PropTypes.boolean,
  showImages: PropTypes.boolean
};
