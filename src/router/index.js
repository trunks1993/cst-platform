import React, { useContext } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import AuthRoute from './authRoute';
import { UserContext } from '@/utils/contexts';

import LoginPage from '@/pages/loginPage';
import Layout from '@/pages/layout';
import Page404 from '@/pages/page404';
import Dashboard from '@/pages/dashboard';

import componentObj, { flatTree } from '@/utils';

export default () => (
  <HashRouter>
    <Switch>
      <AuthRoute exact path="/login" authTo="/" component={LoginPage} />
      <AuthRoute path="/jd" authTo="/login" component={Layout} />
      <Redirect from="/" to="/jd" />
      <Route component={Page404} />
    </Switch>
  </HashRouter>
);

export const RouteList = ({ match }) => {
  const user = useContext(UserContext);
  return (
    <Switch>
      {
        flatTree(user.menu).filter(item => item.component).map((item, index) => (
          <Route path={`${match.path + item.path}`} key={index} component={componentObj[item.component]} />
        ))
      }
      <Route exact path={match.path} component={Dashboard} />
      <Route component={Page404} />
    </Switch>
  );
};
