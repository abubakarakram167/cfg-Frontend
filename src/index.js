import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {BrowserRouter} from "react-router-dom";
import axios from 'axios';
import {toast} from "react-toastify";


import history from './utils/history.js';
import 'sanitize.css/sanitize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import App from './containers/App/index';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import {HelmetProvider} from 'react-helmet-async';
import configureStore from './store/configureStore';


toast.configure({
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
})


// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root')


const ConnectedApp = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <BrowserRouter>
                <HelmetProvider>
                    <App/>
                </HelmetProvider>
            </BrowserRouter>
        </ConnectedRouter>
    </Provider>
);

const render = () => {
    ReactDOM.render(<ConnectedApp/>, MOUNT_NODE);
};
// if (module.hot) {
//     // Hot reloadable React components
//     // modules.hot.accept does not accept dynamic dependencies,
//     // have to be constants at compile-time
//     module.hot.accept(['containers/App/Loadable.js'], () => {
//         ReactDOM.unmountComponentAtNode(MOUNT_NODE);
//         render();
//     });
// }
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
reportWebVitals();
