import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from '../pages/home/HomePage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import RecipePage from '../pages/recipePage/RecipePage';
import LoginPage from '../pages/login/LoginPage';
import MontyPage from '../pages/monty/MontyPage';
import ResultsPage from '../pages/monty/resultsPage/ResultsPage';
import StatsPage from '../pages/stats/StatsPage';
import PreferencesPage from '../pages/preferences/PreferencesPage';
import NotFoundPage from '../pages/notfound/NotFoundPage';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={LoginPage} />
        <PrivateRoute path="/home" component={HomePage} />
        <PrivateRoute path="/dashboard/:id" component={RecipePage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/monty/:id/recipe/:id" component={RecipePage} />
        <PrivateRoute path="/monty/:id" component={ResultsPage} />
        <PrivateRoute path="/monty" component={MontyPage} />
        <PrivateRoute path="/stats" component={StatsPage} />
        <PrivateRoute path="/preferences" component={PreferencesPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routing;
