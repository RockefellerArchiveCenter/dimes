import React, { Component } from 'react';
import Button from "./Button";

class PageRecord extends Component {
  constructor(props) {
    super(props)
    const exampleData = [
      {"uri": "/objects/wjhfxgo5jdzsysz72cbypcyhp3"},
      {"uri": "/objects/qckuiz9z5hb358esjsyuxqxfx4"},
      {"uri": "/objects/jahav8ukco7ztxjdy2xc4poa95"},
      {"uri": "/objects/rq6x9jtb24qpps7oujdrsdiou3"},
      {"uri": "/objects/rg8ia6yvtv63buq4sg3jpsdph4"},
      {"uri": "/objects/s294v2qnsoo6ufn4qrdqjh3po4"}
    ]
    this.requestButtons = exampleData.map((item, idx) =>
      <Button
        key={idx}
        label="Add example data"
        iconAfter="add_circle_outline"
        className="btn--gray btn--sm"
        onClick={() => this.saveItem(item)} />
    );
  }
  saveItem = item => {
	  var existing = localStorage.getItem("savedItems");
    existing = existing ? JSON.parse(existing) : {};
    existing[item.uri] = {"saved": Date.now()}
	  localStorage.setItem("savedItems", JSON.stringify(existing));
    this.props.updateMyListCount(Object.keys(existing).length)
  }
  requestButtons
  render() {
    return (
      <div>
         <h1>Collection or Object Details and Context</h1>
         {this.requestButtons}
      </div>
    )
  }
}

export default PageRecord;
