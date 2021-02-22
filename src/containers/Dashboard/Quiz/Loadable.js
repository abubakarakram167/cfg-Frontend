/**
 * Asynchronously loads the component for HomePage
 */

import loadable from "../../../utils/loadable";

export const QuizContentScreen = loadable(() => import("./QuizContentScreen"));
