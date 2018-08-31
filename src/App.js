import React, { Component } from 'react';
import Main from './components/main';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Details from './components/details';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container-fluid">
            <div className="row">
              <Route exact path="/" component={Main} />
              <Route path="/details/" component={Details} />
            </div>
        </div>
      </Router>
    );
  }
}
