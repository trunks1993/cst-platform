import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import AuthRoute from './authRoute';
// import { UserContext } from '@/utils/contexts';

import LoginPage from '@/pages/loginPage';
import Layout from '@/pages/layout';
import Page404 from '@/pages/page404';

import Manufacturer from '@/pages/manufacturer';

export default () => (
  <HashRouter>
    <Switch>
      <AuthRoute exact path="/login" authTo="/" component={LoginPage} />
      <AuthRoute path="/platForm" authTo="/login" component={Layout} />
      <Redirect exact from="/" to="/platForm/config" />
      <Route component={Page404} />
    </Switch>
  </HashRouter>
);

export const RouteList = () => {
  return (
    <Switch>
      <Route path="/platForm/config" component={Manufacturer} />
      <Route component={Page404} />
    </Switch>
  );
};

