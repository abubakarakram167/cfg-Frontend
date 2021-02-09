/**
 * Combine all reducers in this file and export the combined reducers.
 */

import {combineReducers} from '@reduxjs/toolkit';
import {connectRouter} from 'connected-react-router';

import history from '../../utils/history';

import {login} from './auth.reducer'
import {error} from './error.reducer'
import {categories} from './categories.reducer'
import {users} from './users.reducer'
import {preferences} from './preferences.reducer'

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
    return combineReducers({
        router: connectRouter(history),
        auth: login,
        categories,
        users,
        preferences,
        error
    });
}
