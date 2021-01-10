import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'; 

import './App.css';

import Index from './components/Index';
// import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
        {/* Index */}
        <Route exact path="/" component={Index}/>
        
        {/* Login */}
        {/* <Route exact path="/login" component={Login}/> */}

      </BrowserRouter>
  );
}

export default App;
