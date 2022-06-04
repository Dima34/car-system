import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
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
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

