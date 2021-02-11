/**
 * Asynchronously loads the component for HomePage
 */

import loadable from '../../../utils/loadable';

export const PreferencesListingScreen =  loadable(() => import('./PreferencesListingScreen'));
