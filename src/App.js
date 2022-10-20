import React from 'react';
import Dashboard from './components/layout/Dashboard';
import { AnimatePresence, motion } from "framer-motion";
import { HashRouter, Route, Switch } from 'react-router-dom';
import Pokemon from './components/pokemon/Pokemon';
import './App.css'
import BackgroundVid from './components/layout/BackgroundVid'



function App() {

  return (
    <HashRouter>
      <div>
        <div>
          <BackgroundVid />
          <AnimatePresence>
            <motion.div initial="pageInitial" animate="pageAnimate" exit="pageExit" variants={{
              pageInitial: {
                opacity: 0,
                transition: { duration: 1 },
              },
              pageAnimate: {
                opacity: 1,
                transition: { duration: 1 },
              },
              pageExit: {
                backgroundColor: 'black',
                opacity: 1,
                transition: { duration: 1 },
                transform: ''
              }
            }}>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/pokemon/:index" component={Pokemon} />
              </Switch>
            </motion.div>
          </AnimatePresence>
        </div>
      </div >
    </HashRouter >

  );
}

export default App;
