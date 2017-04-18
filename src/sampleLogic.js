import React from 'react';
import ReactDOM from 'react-dom';

var InteractionTest = React.createClass({
  render() {
    return (
      <div onClick = { this.props.updateCounter }>
        The visual representation is irrelevant
      </div>
    );
  }
});

module.exports = InteractionTest
