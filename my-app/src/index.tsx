import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'inversify';
import { Provider } from 'inversify-react';
import 'reflect-metadata';
import './index.css';
import App from './App';
import { SomeStore } from './someStore';
import * as serviceWorker from './serviceWorker';

const myContainer = new Container();
myContainer.bind(SomeStore).toSelf().inSingletonScope();

ReactDOM.render(
    <Provider container={myContainer}>
        <App/>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
