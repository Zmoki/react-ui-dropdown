import React, { Component, PropTypes } from "react";
import Item from "./Item.jsx";
import Selector from "./Selector.jsx";
import SelectedItem from "./SelectedItem.jsx";

import wordsChecker from "./../words-checker";

export default class SexyDropdown extends Component {
  constructor(props) {
    super(props);

    let items = this.props.items;
    let displayedItems = Object.keys(items).slice(0, 10);

    this.state = {
      items,
      displayedItems,
      selectedItems: [],
      searchValue: ''
    };
  }

  addItemToSelected(itemKey) {
    let s = this.state.selectedItems;

    s.push(itemKey);

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

  goSearch(e){
    let displayedItems;
    if(!e.target.value){
      displayedItems = Object.keys(this.state.items).slice(0, 10);
    } else{
      displayedItems = [];
      let words = wordsChecker.getConditionalWords(e.target.value);

      for(let itemKey in this.state.items){
        let item = this.state.items[itemKey];

        loopFields:
        for(let field in item){
          if(typeof item[field] == "string"){
            let value = item[field].toLowerCase();

            for(let i = 0; i < words.length; i++){
              if(~value.search(words[i])){
                displayedItems.push(itemKey);
                break loopFields;
              }
            }
          }
        }
      }
      displayedItems = displayedItems.slice(0, 10);
    }

    this.setState({
      searchValue: e.target.value,
      displayedItems
    });
  }

  render() {
    const { items, displayedItems, selectedItems } = this.state;

    return (
      <div>
        <Selector
          searchValue={this.state.searchValue}
          handleChangeSearchValue={this.goSearch.bind(this)}>
          {
            selectedItems.map(itemKey => {
              let item = items[itemKey];

              return (
              <SelectedItem
                key={item.id}
                title={item.title}
                onSelectedItemClick={this.removeItemFromSelected.bind(this, itemKey)}/>);
              })
          }
        </Selector>

        <h2>Items</h2>
        {
          displayedItems.filter(itemKey => !~selectedItems.indexOf(itemKey)).map(itemKey=> {
            let item = items[itemKey];

            return (
            <Item
              key={item.id}
              image={item.image}
              title={item.title}
              onItemClick={this.addItemToSelected.bind(this, itemKey)}/>);
          })
        }
      </div>
    )
  }
}

SexyDropdown.propTypes = {
  items: PropTypes.object
};
