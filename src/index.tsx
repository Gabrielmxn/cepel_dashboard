import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import { App } from './App'
import { Provider } from '../node_modules/react-redux/dist/react-redux';
import { store } from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

