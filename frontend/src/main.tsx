import './index.css';

import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';

import store, {persistor} from './store/store';
import Index from '.';

const root = document.getElementById('root');

const app = (
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <Index />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

const rootElement = createRoot(root!);
rootElement.render(app);
