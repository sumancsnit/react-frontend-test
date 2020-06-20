import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import Header from '../components/Header/Header';

const Navigation = () => (
  <>
    <Header />
    <Switch>
      <Route exact path='/' component={HomePage} />
    </Switch>
  </>
);

export default Navigation;
