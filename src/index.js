import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";
import allReducers from './reducer';
import {Provider} from "react-redux"
import {
  useSelector as reduxUseSelector,
  TypedUseSelectorHook,
} from 'react-redux';

const store = configureStore({reducer:allReducers})

type RootState = ReturnType<typeof store.getState>;

export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
  
);
