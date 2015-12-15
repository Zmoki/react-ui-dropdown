import "./stylesheets/react-ui-dropdown.css";

import React, { Component, PropTypes } from "react";
import Items from "./Items";
import Item from "./Item";
import SearchInput from "./SearchInput";
import SelectedItem from "./SelectedItem";

import itemChecker from "./../item-checker";

/**
 * Variable for store count of components in the scope.
 *
 * @type {Number}
 */
let idCounter = 0;

/**
 * Return unique id for component. Useful for id in HTML.
 *
 * @param {String} prefix
 * @returns {String}
 */
function uniqueId(prefix) {
  let id = ++idCounter;

  return prefix + id;
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 * The function will be called after it stops being called for N milliseconds.
 *
 * Code taken from article {@link https://davidwalsh.name/javascript-debounce-function|JavaScript Debounce Function}.
 *
 * @param {Function} func - Function which will need to call
 * @param {Number} wait - Milliseconds after func will be called
 * @returns {Function}
 */
function debounce(func, wait) {
  let timeout;
  return function() {
    let context = this, args = arguments;
    let later = function() {
      timeout = null;
      func.apply(context, args);
    };
    let callNow = !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export default class ReactUIDropdown extends Component {
  constructor(props) {
    super(props);

    const maxDisplayedItems = props.maxDisplayedItems || 10;
    const items = this.getItemsFromData(props.items, maxDisplayedItems);

    this.state = {
      dropdownId: uniqueId("dropdown-"),
      maxDisplayedItems,
      items,
      focusedItem: items.keys.displayed[0] || null,
      label: props.label || "",
      searchValue: "",
      multiple: props.multiple !== false,
      showImages: props.showImages !== false
    };
  }

  componentDidMount() {
    if (this.props.source && this.props.source.url) {
      this.sendRequest(this.props.source.url, (xhr) => {
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

    this.sendRequest = debounce(this.sendRequest, 500);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.focusedItem != nextState.focusedItem) {
      let item = this.refs["item-" + this.state.focusedItem];
      if (item) item.setFocused(false);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.focusedItem != this.state.focusedItem) {
      let item = this.refs["item-" + this.state.focusedItem];
      if (item) item.setFocused(true);
    }
  }

  /**
   * Transform array of data for suitable collection of items.
   *
   * @param {Array} data
   * @param {Number} maxDisplayedItems
   * @returns {{collection: {}, keys: {all: Array, started: Array, displayed: Array, selected: Array}}}
   */
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

  /**
   * Return keys of displayed items from state, which not selected.
   *
   * @returns {Array}
   */
  getNotSelectedItems() {
    return this.state.items.keys.displayed.filter(itemKey => !~this.state.items.keys.selected.indexOf(itemKey));
  }

  /**
   * Function create an ajax GET request to url and give response in callback.
   *
   * @param {String} url
   * @param {Function} callback
   */
  sendRequest(url, callback) {
    let xhr;
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch(e) {
      try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch(E) {
        xhr = false;
      }
    }
    if (!xhr && typeof XMLHttpRequest != "undefined") {
      xhr = new XMLHttpRequest();
    }

    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          callback(xhr);
        }
      }
    };

    xhr.send();
  }

  /**
   * Add itemKey to array of selected items in state.
   * If component is multiple, itemKey will be added to array, else will create array contained only one selected item.
   *
   * @param {Number} itemKey
   */
  addItemToSelected(itemKey) {
    let items = this.state.items;
    items.keys.selected = this.state.multiple ? this.state.items.keys.selected.concat(itemKey) : [itemKey];

    this.setState({
      items
    });
  }

  /**
   * Remove itemKey from array of selected items in state.
   *
   * @param {Number} itemKey
   */
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

  /**
   * Update focusedItem in state.
   *
   * @param {Number} itemKey
   */
  setFocusedItem(itemKey) {
    if (this.state.focusedItem == itemKey) return;
    this.setState({
      focusedItem: itemKey
    });
  }

  /**
   * Search item, which contain string like q. Search in local and on server.
   *
   * @param {String} q
   * @param {Function} callback
   */
  goSearch(q, callback) {
    if (!q.length) {
      return;
    }

    let foundItemsKeys = [];
    const fields = ["title"];

    this.state.items.keys.all.forEach(itemKey => {
      if (itemChecker.check(q, this.state.items.collection[itemKey], fields)) foundItemsKeys.push(itemKey);
    });

    if (!this.props.source || !this.props.source.url) {
      callback(foundItemsKeys);
      return;
    }

    this.sendRequest(`${this.props.source.url}?q=${q}&search_in=${this.props.source.searchIn}`, (xhr) => {
      const response = JSON.parse(xhr.responseText);
      const serverFoundItemsKeys = response.items.map(item => item.id);

      if (serverFoundItemsKeys.length) {
        foundItemsKeys = foundItemsKeys.concat(serverFoundItemsKeys.filter(itemKey => !~foundItemsKeys.indexOf(itemKey)));
      }

      callback(foundItemsKeys);
    });
  }

  /**
   * Show or hide list of items.
   */
  toggleItems() {
    this.refs.items.toggleHidden((isHidden)=> {
      if(!isHidden) {
        this.setState({
          focusedItem: this.getNotSelectedItems()[0] || null
        });
      }
    });
  }

  handleSearchInputChange(e) {
    const searchValue = e.target.value;

    this.setState({
      searchValue
    });

    const updateState = (displayedItemsKeys) => {
      let items = this.state.items;
      items.keys.displayed = displayedItemsKeys;

      this.setState({
        items,
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
      <div className="dropdown">
        <label className="dropdown-label" id={dropdownId + "-label"} htmlFor={dropdownId + "-search"}>
          {label}
        </label>

        <div className="dropdown-selector">
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

ReactUIDropdown.propTypes = {
  items: PropTypes.array,
  source: PropTypes.shape({
    url: React.PropTypes.string,
    searchIn: React.PropTypes.string
  }),
  maxDisplayedItems: PropTypes.number,
  label: PropTypes.string,
  showImages: PropTypes.bool,
  multiple: PropTypes.bool
};
