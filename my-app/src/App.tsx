import React, { Component } from 'react';
import { resolve } from 'inversify-react'
import logo from './logo.svg';
import { SomeStore } from './someStore';
import { observer } from 'mobx-react';
import { NewsCollection } from './news-collection/news-collection.component';
import './App.scss';

@observer
class App extends React.Component {

  @resolve(SomeStore)
  private readonly _someStore: SomeStore;

  render() {
    return (
      <div className="App">
        <NewsCollection />
      </div>
    );
  }
}

export default App;
