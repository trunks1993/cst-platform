import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import AuthRoute from './authRoute';
// import { UserContext } from '@/utils/contexts';

import LoginPage from '@/pages/loginPage';
import Layout from '@/pages/layout';
import Page404 from '@/pages/page404';
import Dashboard from '@/pages/dashboard';
import Home from '@/pages/home';

import Manufacturer from '@/pages/manufacturer';

const isCs = (process.env.REACT_APP_ENV === 'cs');

export default () => (
  <HashRouter>
    <Switch>
      <AuthRoute exact path="/login" authTo="/" component={LoginPage} />
      <AuthRoute path="/platForm" authTo="/login" component={Layout} />
      <Redirect exact from="/" to={ isCs ? '/platForm/config' : '/platForm/home' } />
      <Route component={Page404} />
    </Switch>
  </HashRouter>
);

export const RouteList = () => {
  return (
    <Switch>
      { !isCs && <Route path="/platForm/home" component={Home} /> }
      <Route path="/platForm/config" component={isCs ? Manufacturer : Dashboard} />
      <Route component={Page404} />
    </Switch>
  );
};

