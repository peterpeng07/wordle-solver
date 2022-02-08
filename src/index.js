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
  // <<BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<App />} />
  //     <Route path="known" element={<First />} />
  //     <Route path="include" element={<Second />} />
  //     <Route path="exclude" element={<Third />} />
  //     <Route
  //       path="*"
  //       element={
  //         <main style={{ padding: "1rem" }}>
  //           <p>There's nothing here!</p>
  //         </main>
  //       }
  //     />
  //   </Routes>
  // </BrowserRouter>>,
  <App />,
  document.getElementById('root')
);
