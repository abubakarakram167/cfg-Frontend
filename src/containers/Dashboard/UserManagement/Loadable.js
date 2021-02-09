/**
 * Asynchronously loads the component for HomePage
 */

import loadable from '../../../utils/loadable';

export const UserManagement = loadable(() => import('./UserManagement'));
export const AddUser = loadable(() => import('./AddUser'));
export const EditUser = loadable(() => import('./editUser'));
