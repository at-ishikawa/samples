import React from 'react';
import ReactDOM from 'react-dom';

var HelloWorld = React.createClass({
  getInitialState: function() {
    return {
      text: 'This is the first variable example for React.'
    };
  },
  render: function() {
    var propertyNodes = this.props.properties.map(function(property) {
      return (
        <div>
          Property for HelloWorld: {property.name}
        </div>
      );
    });
    return (
      <div>
        <h1>
          Hello World!
        </h1>
        <p>{this.state.text}</p>
        {propertyNodes}
      </div>
    );
  }
});

var properties = [
  {
    name: 'John'
  }
];
ReactDOM.render(
  <HelloWorld properties={ properties } />,
  document.getElementById('example')
);
