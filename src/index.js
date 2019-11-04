import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/router';
import appStore from '@/redux';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import '@/styles/index.scss';
// import '@/mock/index';
if (window.screen.width >= 1400) {
  import('@/config/commonMax.scss');
  console.log(window.screen.width);
} else if (window.screen.width <= 1366){
  import('@/config/commonMin.scss');
}

const store = createStore(appStore, applyMiddleware(thunk));
console.log(store.getState());
ReactDOM.render(
  <Provider store ={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
