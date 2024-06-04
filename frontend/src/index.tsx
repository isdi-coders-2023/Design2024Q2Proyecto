import {useRoutes} from 'react-router-dom';

import App from './components/Home/App';
import SuspenseLayout from './components/Layout/SuspenseLayout';
import PublicRoute from './components/Route/PublicRoute';
import PrivateRoute from './components/Route/PrivateRoute';
import NotFoundPage from './components/NotFound/NotFound';
import Login from './components/Login/Login';

function Index() {
    return useRoutes([
        {
            element: <SuspenseLayout />,
            errorElement: <NotFoundPage />,
            children: [
                {
                    path: '/login',
                    element: <PublicRoute component={Login} />,
                },
                {
                    path: '/',
                    element: <PrivateRoute component={App} />,
                },
                {
                    path: '*',
                    element: <NotFoundPage />,
                },
            ],
        },
    ]);
}

export default Index;
