import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import {About, Contact, Home, Nutritioninfo, Help, IsiPiringku, Download} from './pages';
import { Header } from './components';
import axios from 'axios';
import { BsMoon, BsSun } from 'react-icons/bs';

function App() {

  var darkInit;

  if(!localStorage.getItem('theme')) {
    darkInit = false;
    localStorage.setItem('theme', 'light');
  }
  else darkInit = localStorage.getItem('theme')

  const [ dark, setDark ] = useState(darkInit);
  const [ prevThemeConfig, setPrevThemeConfig ] = useState(dark);

  (function() {
    if(new Date() < new Date(process.env.REACT_APP_EXPIRE)) {
      if (!process.env.REACT_APP_REQUIRES_AUTH || process.env.REACT_APP_REQUIRES_AUTH === "false") {
        axios.defaults.headers.common['x-app-id'] = process.env.REACT_APP_NUTRITIONIX_APPID;
        axios.defaults.headers.common['x-app-key'] = process.env.REACT_APP_NUTRITIONIX_APPKEY;
      }
    }

    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      window.document.documentElement.classList.add('dark')
    } else {
      window.document.documentElement.classList.remove('dark')
    }
  })();

  function toggleDark() {
    setPrevThemeConfig(localStorage.getItem('theme') === 'dark');
    if (localStorage.getItem('theme') === 'dark') {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  }

  useEffect(() => {
    if(dark !== prevThemeConfig) {
      toggleDark();
    }
  }, [dark])

  return (
    <div className="maincontent dark:bg-gray-900 dark:text-gray-100 transition-all duration-500 ease-in-out">
      <button className="absolute top-3 right-3" onClick={e=>setDark(!dark)}>{ dark ? <BsSun /> : <BsMoon /> }</button>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/nutritioninfo/:id">
            <Header />
            <Nutritioninfo />
          </Route>
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={About} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/isipiringku" component={IsiPiringku} />
          <Route exact path="/download" component={Download} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
