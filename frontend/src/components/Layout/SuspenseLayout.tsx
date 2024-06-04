import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';
import Loader from '../Loader/Loader';

const SuspenseLayout: React.FC = () => (
    <Suspense fallback={<Loader />}>
        <Outlet />
    </Suspense>
);

export default SuspenseLayout;
