import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from "react-redux";
import store from './Store';

store.subscribe(()=>console.log(store.getState()))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <GoogleOAuthProvider clientId="893913805202-rg7o6somctq21ike6dk1u0d696t64e0q.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>
    </Provider>
);
