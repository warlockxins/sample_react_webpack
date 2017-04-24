import React from 'react';
import ReactDOM from 'react-dom';

var createReactClass = require('create-react-class');

var InteractionTest = createReactClass({
  render() {
    return (
      <div onClick = { this.props.updateCounter }>
        The visual representation is irrelevant ?
      </div>
    );
  }
});

module.exports = InteractionTest
