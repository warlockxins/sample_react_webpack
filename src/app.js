import React from 'react';
import ReactDOM from 'react-dom';

import InteractionTest from './sampleLogic'
import ListItems from './list'

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interaction: 0,
      listItems: ["one", "two", "three", "four"]
    }
  }

  clickButton() {
    let inter = this.state.interaction + 1;
    this.setState({
      interaction: inter
    });
  }

  listItemPressed(index) {
    let {listItems} =  JSON.parse(JSON.stringify(this.state));
    listItems[index] += ";)";

    this.setState({
        listItems: listItems
    })
  }

  render() {
    return (
      <div>
        <h1>test every thing { this.state.interaction } </h1>
        <ListItems listItems = { this.state.listItems } listItemPressed={ this.listItemPressed.bind(this) } />
        <InteractionTest updateCounter={ this.clickButton.bind(this) } />
      </div>
    );
  }
};


ReactDOM.render(<MyComponent />, document.getElementById('root'));
