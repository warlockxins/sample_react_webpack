import React from 'react';
import ReactDOM from 'react-dom';

var MyComponent = React.createClass({
  render() {
    return (
      <div>
        <h1>Shopping List for </h1>
        <ul>
          <li>one</li>
          <li>two</li>
          <li>three</li>
        </ul>
      </div>
    );
  }
});


ReactDOM.render(<MyComponent />, document.getElementById('root'));
