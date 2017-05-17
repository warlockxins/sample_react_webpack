import React from 'react';
import ReactDOM from 'react-dom';

var createReactClass = require('create-react-class');

var InteractionTest = createReactClass({
  render() {
    return (
      <div onClick = { this.props.updateCounter }>
        Press to increment number in the Header?
      </div>
    );
  }
});

module.exports = InteractionTest
