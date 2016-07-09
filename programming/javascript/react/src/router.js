import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

class Header extends React.Component {
  render() {
    return (
        <header>
        Header
        </header>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
        <footer>
        Footer
        </footer>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Header />
        <main id="main">
          <h1><Link to="/router/helloworld/">Welcome! Click here</Link></h1>
          {this.props.children}
        </main>
      <Footer />
    );
  }
}

class HelloWorld extends React.Component {
  render() {
    return (
      <div id="hello_world">
        Hello World
      </div>
    );
  }
}


class Page2 extends React.Component {
  render() {
    return (
        <div id="page2">
          Page 2
        </div>
    );
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/router/" component={App}>
      <Route path="helloworld/" component={HelloWorld} />
      <Route path="page2/" component={Page2} />
    </Route>
  </Router>
), document.body);
