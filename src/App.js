import React from 'react';
import Dashboard from './components/layout/Dashboard';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Pokemon from './components/pokemon/Pokemon';
import './App.css'
import BackgroundVid from './components/layout/BackgroundVid';

function App() {

  return (
    <HashRouter>
      <div>
        <BackgroundVid />
        <div>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/pokemon/:index" component={Pokemon} />
          </Switch>
        </div>
      </div>
    </HashRouter >

  );
}

export default App;
