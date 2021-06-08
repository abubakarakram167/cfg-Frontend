/**
 * Asynchronously loads the component for HomePage
 */

import loadable from '../../utils/loadable';

export const QuizContentScreen = loadable(() => import('./QuizContentScreen'));
export const PreviewQuizScreen = loadable(() => import('./PreviewQuizScreen'));
export const QuizAddScreen = loadable(() => import('./QuizAddScreen'));
export const QuizListingScreen = loadable(() => import('./QuizListingScreen'));
