import React, {lazy} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';

const ProtectedRoute = lazy(() => import('./protectedRouter'));
const UserHome = lazy(() => import('pages/user-home-page/user-home'));
const UserRewards = lazy(() => import('pages/user-home-page/user-rewards'));
const UserConnections = lazy(() =>
  import('pages/user-home-page/user-connections'),
);
const UserAchievements = lazy(() =>
  import('pages/user-home-page/user-achievement'),
);
const UserGroup = lazy(() => import('pages/user-home-page/groups'));
const UserProfile = lazy(() => import('pages/user-home-page/user-profile'));
const UserEvents = lazy(() => import('pages/user-home-page/user-events'));
const UserFriends = lazy(() => import('pages/user-home-page/user-friends'));
const HostAConversation = lazy(() =>
  import('pages/user-home-page/host-a-conversation'),
);
const HomeCFGTools = lazy(() => import('pages/user-home-page/cfg-tools'));
const CfgToolsPage = lazy(() => import('pages/user-home-page/cfg-tools-page'));
const Learn = lazy(() => import('pages/user-home-page/learn'));
const AllInboxPage = lazy(() => import('pages/user-home-page/all-in-box'));
const ConversationContentDisplay = lazy(() =>
  import('pages/user-home-page/conversation-content-display'),
);
const userJournals = lazy(() => import('pages/journal'));
const Homedashicon = lazy(() => import('pages/user-home-page/home-dash-icon'));

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
    path='/home/friends'
    component={withRouter(UserFriends)}
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
