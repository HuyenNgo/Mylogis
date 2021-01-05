import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'

import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <Router>
      <Routes
      />
      <div id="waitingWrapper">
        <div id="waitingDiv"></div>
      </div>
    </Router>
  );
}

export default App;
