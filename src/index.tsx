import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import { Provider } from '../node_modules/react-redux/dist/react-redux';
import { store } from './store/index';
import { RouterProviders } from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
 
    <Provider store={store}>
      
      <RouterProviders />
    </Provider>

  // </React.StrictMode>
);


