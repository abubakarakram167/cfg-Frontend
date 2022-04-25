import React, {lazy} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';

import {
  QuizContentScreen,
  PreviewQuizScreen,
  QuizAddScreen,
  QuizListingScreen,
} from 'pages/Quiz/Loadable';
import ShowMiniContent from 'pages/showContent';

const AdminHome = lazy(() => import('pages/admin-home'));
const Dashboard = lazy(() => import('pages/dashboard'));
const Events = lazy(() => import('pages/events'));
const UserManagement = lazy(() => import('pages/user-management'));
const CfgSession = lazy(() => import('pages/cfg-session'));
const CfgTool = lazy(() => import('pages/cfg-tools'));
const Timeline = lazy(() => import('pages/timeline'));
const TimeLinePosts = lazy(() => import('pages/timeline-posts'));
const Preferences = lazy(() => import('pages/preferences'));
const MediaLibrary = lazy(() => import('pages/media-library'));
const MiniCfg = lazy(() => import('pages/mini-cfg'));
const Rewards = lazy(() => import('pages/rewards'));
const Editor = lazy(() => import('pages/editor/index'));
const CfgElement = lazy(() => import('pages/cfg-element'));
const CfgToolElement = lazy(() => import('pages/cfg-tool-element'));
const ContentDisplay = lazy(() => import('pages/content-display'));
const EditContent = lazy(() => import('pages/edit-content'));
const ProtectedRoute = lazy(() => import('./protectedRouter'));

export default [
  <ProtectedRoute exact path='/admin' component={AdminHome} />,
  <ProtectedRoute
    exact
    path='/admin/editor/:type/:id/:contentHeaderId'
    component={withRouter(Editor)}
  />,
  <ProtectedRoute
    exact
    path='/admin/content/display/:id'
    component={withRouter(ContentDisplay)}
  />,
  <ProtectedRoute
    exact
    path='/admin/content/edit/:id/:content_id/:type/:contentType'
    component={withRouter(EditContent)}
  />,
  <ProtectedRoute
    exact
    path='/admin/dashboard'
    component={withRouter(Dashboard)}
  />,
  <ProtectedRoute
    exact
    path='/admin/user-management'
    component={withRouter(UserManagement)}
  />,
  <ProtectedRoute
    exact
    path='/admin/cfg-tools'
    component={withRouter(CfgTool)}
  />,
  <ProtectedRoute
    exact
    path='/admin/cfg-tools/:id'
    component={withRouter(CfgToolElement)}
  />,
  <ProtectedRoute
    exact
    path='/admin/cfg-tools/:type/:id/:contentHeaderId/cfgType'
    component={withRouter(Editor)}
  />,
  <ProtectedRoute
    exact
    path='/admin/cfg-session'
    component={withRouter(CfgSession)}
  />,
  <ProtectedRoute
    exact
    path='/admin/cfg-session/:id'
    component={withRouter(CfgElement)}
  />,
  <ProtectedRoute
    exact
    path='/admin/cfg-session/:type/:id/:contentHeaderId/:cfgType'
    component={withRouter(Editor)}
  />,
  <ProtectedRoute
    exact
    path='/admin/timeline'
    component={withRouter(Timeline)}
  />,
  <ProtectedRoute exact path='/admin/events' component={withRouter(Events)} />,
  <ProtectedRoute path='/add/quiz' component={withRouter(QuizAddScreen)} />,
  <ProtectedRoute
    path='/content/quiz'
    component={withRouter(QuizContentScreen)}
  />,
  <ProtectedRoute
    path='/preview/quiz'
    component={withRouter(PreviewQuizScreen)}
  />,
  <ProtectedRoute
    path='/listing/quiz'
    component={withRouter(QuizListingScreen)}
  />,
  <ProtectedRoute
    exact
    path='/admin/preferences'
    component={withRouter(Preferences)}
  />,
  <ProtectedRoute
    exact
    path='/admin/media-library'
    component={withRouter(MediaLibrary)}
  />,
  <ProtectedRoute
    exact
    path='/admin/mini-cfg'
    component={withRouter(MiniCfg)}
  />,
  <ProtectedRoute
    exact
    path='/admin/rewards'
    component={withRouter(Rewards)}
  />,
  <ProtectedRoute
    exact
    path='/admin/timeline-posts'
    component={withRouter(TimeLinePosts)}
  />,
];
