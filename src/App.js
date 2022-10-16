import React from 'react';
import Dashboard from './components/layout/Dashboard';
import Navbar from './components/layout/Navbar';

import './App.css'
import BackgroundVid from './components/layout/BackgroundVid';

function App() {

  return (
    <div>
      <BackgroundVid />
      <div>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
