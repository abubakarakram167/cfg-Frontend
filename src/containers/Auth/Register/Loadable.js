/**
 * Asynchronously loads the component for HomePage
 */

import loadable from '../../../utils/loadable';
export const Register =loadable(() => import('./Register'));
export const RegisterLink = loadable(() => import('./RegisterLink'));

