import React, { Component, PropTypes } from "react";
import Item from "./Item.jsx";
import Selector from "./Selector.jsx";
import SelectedItem from "./SelectedItem.jsx";

export default class SexyDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      selectedItems: this.props.selectedItems
    };
  }

  addItemToSelected(itemIndex) {
    let s = this.state.selectedItems;

    s.push(this.state.items[itemIndex]);

    let i = this.state.items;

    i[itemIndex].selected = true;

    this.setState({
      items: i,
      selectedItems: s
    });
  }

  render() {
    const { items, selectedItems } = this.state;

    return (
      <div>
        <Selector>
          {selectedItems.map(selectedItem =>
          <SelectedItem
            key={selectedItem.uid}
            title={[selectedItem.firstName, selectedItem.lastName].join(" ")}/>
            )}
        </Selector>

        <h2>Items</h2>
        {items.map((item, i)=> {
          if(!item.selected){
            return (
            <Item
              key={item.uid}
              image={item.photo}
              title={[item.firstName, item.lastName].join(" ")}
              onItemClick={this.addItemToSelected.bind(this, i)}/>
              )
            }
          }
          )}
      </div>
    )
  }
}

SexyDropdown.propTypes = {
  selectedItems: PropTypes.array,
  items: PropTypes.array
};
