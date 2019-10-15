import React, { useContext } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import AuthRoute from './authRoute';
import { UserContext } from '@/utils/contexts';

import LoginPage from '@/pages/loginPage';
import Layout from '@/pages/layout';
import Page404 from '@/pages/page404';
import Dashboard from '@/pages/dashboard';
import Manufacturer from '@/pages/manufacturer';

import componentObj, { flatTree } from '@/utils';

export default () => (
  <HashRouter>
    <Switch>
      <AuthRoute exact path="/login" authTo="/" component={LoginPage} />
      <AuthRoute exact path="/jd" authTo="/login" component={Layout} />
      <AuthRoute exact path="/manufacturer" authTo="/login" component={Layout} />
      <Redirect exact from="/" to="/jd" />
      <Redirect exact from="/" to="/manufacturer" />
      <Route component={Page404} />
    </Switch>
  </HashRouter>
);

export const RouteList = ({ match }) => {
  const user = useContext(UserContext);

  console.log('user: ', flatTree(user.menu));
  console.log('match :', match);
  return (
    <Switch>
      {flatTree(user.menu)
        .filter(item => item.component)
        .map((item, index) => (
          <Route
            path={`${match.path + item.path}`}
            key={index}
            component={componentObj[item.component]}
          />
        ))}
      <Route exact path={match.path} component={match.path === '/jd' ? Dashboard : Manufacturer} />
      <Route component={Page404} />
    </Switch>
  );
};
