import React from 'react';
import './App.css';
import NavBar from './components/NavBar.jsx';
import Characters from './components/characters.jsx';
import Comics from './components/comics.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: "",
    };
  }

  handleContents = (contents) => {
    this.setState({ contents });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Characters changeContents={this.handleContents} />
            </Route>
            <Route exact path="/comics">
              <Comics contents={this.state.contents} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  
}

export default App;