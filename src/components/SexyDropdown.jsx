import React, { Component, PropTypes } from "react";
import Items from "./Items.jsx";
import Item from "./Item.jsx";
import SearchInput from "./SearchInput.jsx";
import SelectedItem from "./SelectedItem.jsx";

import itemChecker from "./../item-checker";

let idCounter = 0;

function uniqueId(prefix) {
  let id = ++idCounter;

  return prefix + id;
}

export default class SexyDropdown extends Component {
  constructor(props) {
    super(props);

    const maxDisplayedItems = props.maxDisplayedItems || 10;
    const items = this.getItemsFromData(props.items, maxDisplayedItems);

    this.state = {
      dropdownId: uniqueId('sd-'),
      maxDisplayedItems,
      items,
      focusedItem: items.keys.displayed[0] || null,
      label: props.label || "",
      searchValue: '',
      multiple: props.multiple !== false,
      showImages: props.showImages !== false
    };
  }

  componentDidMount() {
    if (this.props.source) {
      this.sendRequest(this.props.source, (xhr) => {
        const response = JSON.parse(xhr.responseText);

        if (!response.items || !response.items.length) {
          return;
        }

        const items = this.getItemsFromData(response.items);

        this.setState({
          items,
          focusedItem: items.keys.displayed[0] || null
        });
      });
    }
  }

  componentWillUpdate(nextProps, nextState){
    if(this.state.focusedItem != nextState.focusedItem) {
      let item = this.refs["item-" + this.state.focusedItem];
      if (item) item.setFocused(false);
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.focusedItem != this.state.focusedItem) {
      let item = this.refs["item-" + this.state.focusedItem];
      if (item) item.setFocused(true);
    }
  }

  getItemsFromData(data, maxDisplayedItems) {
    maxDisplayedItems = maxDisplayedItems || this.state.maxDisplayedItems;

    let items = {
      collection: {},
      keys: {
        all: [],
        started: [],
        displayed: [],
        selected: []
      }
    };

    if (data && data.length) {
      items.keys.all = data.map(item => item.id);
      items.keys.started = items.keys.displayed = items.keys.all.slice(0, maxDisplayedItems);
      items.collection = data.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
      }, {});
    }

    return items;
  }

  getNotSelectedItems() {
    return this.state.items.keys.displayed.filter(itemKey => !~this.state.items.keys.selected.indexOf(itemKey));
  }

  sendRequest(url, callback) {
    let xhr;
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (E) {
        xhr = false;
      }
    }
    if (!xhr && typeof XMLHttpRequest!='undefined') {
      xhr = new XMLHttpRequest();
    }

    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if(xhr.status == 200) {
          callback(xhr);
        }
      }
    };

    xhr.send();
  }

  addItemToSelected(itemKey) {
    let items = this.state.items;
    items.keys.selected = this.state.multiple ? this.state.items.keys.selected.concat(itemKey) : [itemKey];

    this.setState({
      items
    });
  }

  removeItemFromSelected(itemKey) {
    let s = this.state.items.keys.selected;

    s.splice(s.indexOf(itemKey), 1);

    let items = this.state.items;
    items.keys.selected = s;

    this.setState({
      items,
      focusedItem: this.state.items.keys.displayed.filter(itemKey => !~s.indexOf(itemKey))[0]
    });
  }

  setFocusedItem(itemKey) {
    this.setState({
      focusedItem: itemKey
    });
  }

  goSearch(q, callback) {
    if (!q.length) {
      return;
    }

    let foundItemsKeys = [];
    const fields = ["title"];

    this.state.items.keys.all.forEach(itemKey => {
      if(itemChecker.check(q, this.state.items.collection[itemKey], fields)) foundItemsKeys.push(itemKey);
    });

    if (!this.props.source) {
      callback(foundItemsKeys);
      return;
    }

    this.sendRequest(`${this.props.source}?q=${q}&search_in=domain`, (xhr) => {
      const response = JSON.parse(xhr.responseText);
      const serverFoundItemsKeys = response.items.map(item => item.id);

      if (serverFoundItemsKeys.length) {
        foundItemsKeys = foundItemsKeys.concat(serverFoundItemsKeys.filter(itemKey => !~foundItemsKeys.indexOf(itemKey)));
      }

      callback(foundItemsKeys);
    });
  }

  toggleItems() {
    this.refs.items.toggleHidden(()=> {}, ()=> {
      this.setState({
        focusedItem: this.getNotSelectedItems()[0] || null
      });
    });
  }

  handleSearchInputChange(e) {
    const searchValue = e.target.value;
    const updateState = (displayedItemsKeys) => {
      let items = this.state.items;
      items.keys.displayed = displayedItemsKeys;

      this.setState({
        items,
        searchValue,
        focusedItem: items.keys.displayed.filter(itemKey => !~items.keys.selected.indexOf(itemKey))[0] || null
      });
    };

    if (!searchValue.length) {
      updateState(this.state.items.keys.started);
      return;
    }

    this.goSearch(searchValue, foundItemsKeys => {
      updateState(foundItemsKeys.slice(0, this.state.maxDisplayedItems));
    });
  }

  handleSearchInputKeyStroke(e) {
    const focusedItem = this.state.focusedItem;
    const displayedItems = this.getNotSelectedItems();
    const focusedItemIndex = displayedItems.indexOf(focusedItem);
    const updateState = (focusedItemIndex) => {
      this.setState({
        focusedItem: displayedItems[focusedItemIndex] || null
      });
    };

    switch (e.key) {
      case "ArrowDown":
        updateState(focusedItemIndex < (displayedItems.length - 1) ? (focusedItemIndex + 1) : 0);
        break;
      case "ArrowUp":
        updateState((focusedItemIndex == 0) ? (displayedItems.length - 1) : (focusedItemIndex - 1));
        break;
      case "Enter":
        this.addItemToSelected(focusedItem);

        updateState(focusedItemIndex < (displayedItems.length - 1) ? (focusedItemIndex + 1) : (focusedItemIndex - 1));
        break;
    }
  }

  render() {
    const { dropdownId, items, focusedItem, label, searchValue, showImages } = this.state;

    return (
      <div className="sexy-dropdown">
        <label className="sd-label" id={dropdownId + "-label"} htmlFor={dropdownId + "-search"}>
          {label}
        </label>

        <div className="sd-selector">
          {items.keys.selected.map(itemKey =>
          <SelectedItem key={itemKey} {...items.collection[itemKey]}
                        handleItemClick={this.removeItemFromSelected.bind(this, itemKey)}/>)}

          <SearchInput dropdownId={dropdownId} value={searchValue}
                       handleChange={this.handleSearchInputChange.bind(this)}
                       handleFocus={this.toggleItems.bind(this)}
                       handleKeyDown={this.handleSearchInputKeyStroke.bind(this)}/>
        </div>

        <Items ref="items" dropdownId={dropdownId} focusedItem={focusedItem}>
          {items.keys.displayed.map(itemKey =>
          <Item ref={"item-" + itemKey} key={itemKey} dropdownId={dropdownId} {...items.collection[itemKey]}
                selected={~items.keys.selected.indexOf(itemKey)}
                showImages={showImages}
                handleItemClick={this.addItemToSelected.bind(this, itemKey)}
                handleItemHover={this.setFocusedItem.bind(this, itemKey)}/>)}
        </Items>
      </div>
    )
  }
}

SexyDropdown.propTypes = {
  items: PropTypes.array,
  source: PropTypes.string,
  maxDisplayedItems: PropTypes.number,
  label: PropTypes.string,
  showImages: PropTypes.bool,
  multiple: PropTypes.bool
};
