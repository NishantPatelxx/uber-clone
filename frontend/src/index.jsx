import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CaptainContextProvider from './context/CaptainContext';
import UserContextProvider from './context/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <CaptainContextProvider>
      <BrowserRouter>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </BrowserRouter>
    </CaptainContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
