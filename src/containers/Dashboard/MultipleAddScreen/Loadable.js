/**
 * Asynchronously loads the component for HomePage
 */

import loadable from '../../../utils/loadable';

export const MultipleAddScreen =  loadable(() => import('./MultipleAddScreen'));
export const MultipleEditScreen =  loadable(() => import('./MultipleEditScreen'));
export const MultipleContentScreen =  loadable(() => import('./MultipleContentScreen'));
export const MultipleListingScreen =  loadable(() => import('./MultipleListingScreen'));
