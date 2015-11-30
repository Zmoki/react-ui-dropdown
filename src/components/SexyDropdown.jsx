import React, { Component } from "react";
import Item from "./Item.jsx";

export default class SexyDropdown extends Component {
  render() {
    const { items } = this.props;

    return (
      <div>
        {items.map(item=>
        <Item
          id={item.uid}
          image={item.photo}
          title={[item.firstName, item.lastName].join(" ")}/>
          )}
      </div>
    )
  }
}
