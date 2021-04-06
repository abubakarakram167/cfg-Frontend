import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import Settings from './Setting';
import MailApp from './MailApp';
import Common from './Common';
import Editors from './Editors';
import ToDoApp from './ToDoApp';
import Dashboard from './Dashboard';
import Gallery from './Gallery';
import UserList from './UserList';
import Ecommerce from './Ecommerce';
import ContactApp from './ContactApp';
import ScrumboardApp from './ScrumboardApp';
import Auth from './Auth';
import ChatApp from './ChatApp';
import Wall from './Wall';
import Preference from './Preference';
import Session from './Session';
import mediaReducer from './media';

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    session: Session,
    mailApp: MailApp,
    dashboard: Dashboard,
    common: Common,
    editors: Editors,
    todoApp: ToDoApp,
    gallery: Gallery,
    userList: UserList,
    ecommerce: Ecommerce,
    contactApp: ContactApp,
    scrumboardApp: ScrumboardApp,
    chatApp: ChatApp,
    wall: Wall,
    preference: Preference,
    mediaList: mediaReducer,
  });
export default reducers;
