import React from "react";
import { Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import Login from "../Auth/Login/Loadable";
import { Register, RegisterLink } from "../Auth/Register/Loadable";
import HomePage from "../HomePage/Loadable";
import FeaturePage from "../FeaturePage/Loadable";
import NotFoundPage from "../NotFoundPage/Loadable";
//Admin Pages

import MainPage from "../Dashboard/MainPage/Loadable";
import Categories from "../Dashboard/Categories/Loadable";

import { withRouter } from "react-router-dom";
import ProtectedRoute from "./protectedRouter";
import ForgetPassword from "../Auth/ForgetPassword/Loadable";
import {
  UserManagement,
  AddUser,
  EditUser,
} from "../Dashboard/UserManagement/Loadable";
import {
  MultipleAddScreen,
  MultipleContentScreen,
  MultipleListingScreen,
  MultipleEditScreen,
} from "../Dashboard/MultipleAddScreen/Loadable";
import {
  QuizContentScreen,
  PreviewQuizScreen,
} from "../Dashboard/Quiz/Loadable";
import { PreferencesListingScreen } from "../Dashboard/Preferences/Loadable";
import { MediaContentScreen } from "../Dashboard/MediaLibrary/Loadable";
import ResetPassword from "../Auth/ResetPassword/Loadable";
import CFGSessionDetails from "../Dashboard/CFGSession.js/CFGSessionDetails";
import SessionContentScreen from "../Dashboard/CFGSession.js/SessionContentScreen";

function App() {
  return (
    <div>
      <Switch>
        <ProtectedRoute exact path='/' component={withRouter(HomePage)} />
        <Route path='/register' component={withRouter(Register)} />
        <Route
          path='/registration-completed'
          component={withRouter(RegisterLink)}
        />
        <Route path='/reset-request' component={withRouter(RegisterLink)} />
        <Route exact path='/login' component={withRouter(Login)} />
        <Route path='/features' component={withRouter(FeaturePage)} />
        <Route
          path='/forgetPassword/:token?'
          component={withRouter(ForgetPassword)}
        />
        <Route path='/reset' component={withRouter(ResetPassword)} />

        {/*Dashboard Links*/}
        <ProtectedRoute path='/dashboard' component={withRouter(MainPage)} />
        <ProtectedRoute path='/categories' component={withRouter(Categories)} />
        <ProtectedRoute
          path='/userManagement'
          component={withRouter(UserManagement)}
        />
        <ProtectedRoute path='/addUser' component={withRouter(AddUser)} />
        <ProtectedRoute path='/editUser' component={withRouter(EditUser)} />

        <ProtectedRoute
          path='/add/tool'
          component={withRouter(MultipleAddScreen)}
        />
        <ProtectedRoute
          path='/add/reward'
          component={withRouter(MultipleAddScreen)}
        />
        <ProtectedRoute
          path='/add/event'
          component={withRouter(MultipleAddScreen)}
        />
        <ProtectedRoute
          path='/add/session'
          component={withRouter(MultipleAddScreen)}
        />
        <ProtectedRoute
          path='/add/quiz'
          component={withRouter(MultipleAddScreen)}
        />
        <ProtectedRoute
          path='/add/mini'
          component={withRouter(MultipleAddScreen)}
        />
        <ProtectedRoute
          path='/add/timeline'
          component={withRouter(MultipleAddScreen)}
        />

        <ProtectedRoute
          path='/edit/tool'
          component={withRouter(MultipleEditScreen)}
        />
        <ProtectedRoute
          path='/edit/reward'
          component={withRouter(MultipleEditScreen)}
        />
        <ProtectedRoute
          path='/edit/event'
          component={withRouter(MultipleEditScreen)}
        />
        <ProtectedRoute
          path='/edit/session'
          component={withRouter(MultipleEditScreen)}
        />
        <ProtectedRoute
          path='/edit/quiz'
          component={withRouter(MultipleEditScreen)}
        />
        <ProtectedRoute
          path='/edit/mini'
          component={withRouter(MultipleEditScreen)}
        />
        <ProtectedRoute
          path='/edit/timeline'
          component={withRouter(MultipleEditScreen)}
        />

        <ProtectedRoute
          path='/listing/tool'
          component={withRouter(MultipleListingScreen)}
        />
        <ProtectedRoute
          path='/listing/reward'
          component={withRouter(MultipleListingScreen)}
        />
        <ProtectedRoute
          path='/listing/event'
          component={withRouter(MultipleListingScreen)}
        />
        <ProtectedRoute
          path='/listing/session'
          component={withRouter(MultipleListingScreen)}
        />
        <ProtectedRoute
          path='/listing/quiz'
          component={withRouter(MultipleListingScreen)}
        />
        <ProtectedRoute
          path='/listing/mini'
          component={withRouter(MultipleListingScreen)}
        />
        <ProtectedRoute
          path='/listing/timeline'
          component={withRouter(MultipleListingScreen)}
        />

        <ProtectedRoute
          path='/content/tool'
          component={withRouter(MultipleContentScreen)}
        />
        <ProtectedRoute
          path='/content/reward'
          component={withRouter(MultipleContentScreen)}
        />
        <ProtectedRoute
          path='/content/event'
          component={withRouter(MultipleContentScreen)}
        />
        <ProtectedRoute
          path='/content/session'
          component={withRouter(MultipleContentScreen)}
        />
        {/* <ProtectedRoute
          path='/content/quiz'
          component={withRouter(MultipleContentScreen)}
        /> */}
        <ProtectedRoute
          path='/content/quiz'
          component={withRouter(QuizContentScreen)}
        />
        <ProtectedRoute
          path='/listing/media'
          component={withRouter(MediaContentScreen)}
        />
        <ProtectedRoute
          path='/preview/quiz'
          component={withRouter(PreviewQuizScreen)}
        />

        <ProtectedRoute
          path='/content/mini'
          component={withRouter(MultipleContentScreen)}
        />
        <ProtectedRoute
          path='/content/timeline'
          component={withRouter(MultipleContentScreen)}
        />

        <ProtectedRoute
          path='/listing/preference'
          component={withRouter(PreferencesListingScreen)}
        />

        <ProtectedRoute
          path='/content/detail/session'
          component={withRouter(CFGSessionDetails)}
        />

        <Route path='' component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default hot(App);
