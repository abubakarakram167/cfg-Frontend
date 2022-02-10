import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import ProtectedRoute from './protectedRouter';
import UserHome from 'pages/user-home-page/user-home';
import UserRewards from 'pages/user-home-page/user-rewards';
import UserConnections from 'pages/user-home-page/user-connections';
import UserAchievements from 'pages/user-home-page/user-achievement';
import UserGroup from 'pages/user-home-page/groups';
import UserProfile from 'pages/user-home-page/user-profile';
import UserEvents from 'pages/user-home-page/user-events';
import HostAConversation from 'pages/user-home-page/host-a-conversation';
import HomeCFGTools from 'pages/user-home-page/cfg-tools';
import CfgToolsPage from 'pages/user-home-page/cfg-tools-page';
import Learn from 'pages/user-home-page/learn';
import AllInboxPage from 'pages/user-home-page/all-in-box';
import ConversationContentDisplay from 'pages/user-home-page/conversation-content-display';
import userJournals from 'pages/journal';
import Homedashicon from 'pages/user-home-page/home-dash-icon';

export default [
  <ProtectedRoute exact path='/home' component={withRouter(UserHome)} />,
  <ProtectedRoute
    exact
    path='/home/user-rewards'
    component={withRouter(UserRewards)}
  />,
  <ProtectedRoute
    exact
    path='/home/user-achievements'
    component={withRouter(UserAchievements)}
  />,
  <ProtectedRoute
    exact
    path='/home/user-connections'
    component={withRouter(UserConnections)}
  />,
  <ProtectedRoute
    exact
    path='/home/user-groups'
    component={withRouter(UserGroup)}
  />,
  <ProtectedRoute
    exact
    path='/home/user-profile'
    component={withRouter(UserProfile)}
  />,
  <ProtectedRoute
    exact
    path='/home/journals/list'
    component={withRouter(userJournals)}
  />,
  <ProtectedRoute
    exact
    path='/home/user-events'
    component={withRouter(UserEvents)}
  />,
  <ProtectedRoute
    exact
    path='/home/host-a-conversation'
    component={withRouter(HostAConversation)}
  />,
  <ProtectedRoute
    exact
    path='/home/cfg-tools'
    component={withRouter(HomeCFGTools)}
  />,
  <ProtectedRoute
    exact
    path='/home/cfg-tools/:id'
    component={withRouter(CfgToolsPage)}
  />,
  <ProtectedRoute
    exact
    path='/home/cfg-tools/:id/:learnId'
    component={withRouter(Learn)}
  />,
  <ProtectedRoute
    exact
    path='/home/all-in-box'
    component={withRouter(AllInboxPage)}
  />,
  <ProtectedRoute
    exact
    path='/home/conversation/:id'
    component={withRouter(ConversationContentDisplay)}
  />,
  <ProtectedRoute
    exact
    path='/icon-dashboard'
    component={withRouter(Homedashicon)}
  />,
];
