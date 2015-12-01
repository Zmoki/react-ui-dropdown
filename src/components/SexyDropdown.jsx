import React, { Component, PropTypes } from "react";
import Item from "./Item.jsx";
import Selector from "./Selector.jsx";
import SelectedItem from "./SelectedItem.jsx";

export default class SexyDropdown extends Component {
  constructor(props) {
    super(props);

    let items = this.props.items;
    let displayedItems = Object.keys(items).slice(0, 10);

    this.state = {
      items,
      displayedItems,
      selectedItems: []
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

  render() {
    const { items, displayedItems, selectedItems } = this.state;

    return (
      <div>
        <Selector>
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
  items: PropTypes.array
};
