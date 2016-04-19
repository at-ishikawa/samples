import React from 'react';
import ReactDOM from 'react-dom';

var HelloWorld = React.createClass({
  getInitialState: function() {
    return {
      name: 'World'
    };
  },
  handleTextChange: function(event) {
    this.setState({name: event.target.value});
  },
  render: function() {
    return (
      <div>
        <h1>
          Hello {this.state.name}
        </h1>
        <input type="text"
               placeholder="name"
               value={this.state.name}
               onChange={this.handleTextChange}
         />
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
