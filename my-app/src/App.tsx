import React, { Component } from 'react';
import { resolve } from 'inversify-react'
import logo from './logo.svg';
import { SomeStore } from './someStore';
import { observer } from 'mobx-react';
import { NewsCollection } from './news-collection/news-collection.component';
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
            {this._someStore.somevalue}
            <NewsCollection />
        </header>
      </div>
    );
  }
}

export default App;
