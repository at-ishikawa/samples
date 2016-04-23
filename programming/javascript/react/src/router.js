import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="main">
        <h1><Link to="/router/helloworld/">Welcome! Click here</Link></h1>
        {this.props.children}
      </div>
    );
  }
}

class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="hello_world">
        Hello World
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/router/" component={App}>
      <Route path="helloworld/" component={HelloWorld} />
    </Route>
  </Router>
), document.body);
