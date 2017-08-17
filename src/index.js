import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux'
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer,
 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

console.log(store.getState());

ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
