import React, { Component } from 'react';
import { resolve } from 'inversify-react'
import logo from './logo.svg';
import { SomeStore } from './someStore';
import { observer } from 'mobx-react';
import './App.css';

@observer
class App extends React.Component {

  @resolve(SomeStore)
  private readonly _someStore: SomeStore;

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {this._someStore.somevalue}
          </a>
        </header>
      </div>
    );
  }
}

export default App;
