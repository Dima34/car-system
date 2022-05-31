import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import App from './App';
import s from "./index.css";

const reducer = (state, action) =>{
  switch (action.type) {
    
  
    default:
      return state
  }
}

// const store = createStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

