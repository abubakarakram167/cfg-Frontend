import * as actions from 'redux/actions/action.types';
import getPermissionsOfUser from 'components/permission.js';

const user = JSON.parse(localStorage.getItem('current-user'));
const INIT_STATE = {
  permissions: getPermissionsOfUser(user),
};
let payload = null;

const RolesReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case actions.setPermissions:
      return {
        ...state,
        permissions: getPermissionsOfUser(action.payload),
      };

    default:
      return state;
  }
};

export default RolesReducer;
