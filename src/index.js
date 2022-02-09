import React from 'react';
import ReactDOM from 'react-dom';
// https://reactrouter.com/docs/en/v6/getting-started/tutorial
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import App from './App';
import First from './routes/first';
import Second from './routes/second'
import Third from './routes/third'


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
