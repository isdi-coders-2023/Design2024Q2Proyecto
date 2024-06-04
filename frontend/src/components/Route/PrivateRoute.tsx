import {connect} from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';
import {AppState} from '../../store/store';
import {isLoggedIn} from '../../store/auth/selectors';

interface PrivateRouteProps {
    isLoggedIn: boolean;
    component: React.FC;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component: Component,
    isLoggedIn,
}) => {
    const location = useLocation();
    if (!isLoggedIn) {
        return <Navigate to={'/login'} state={{from: location}} replace />;
    }

    return <Component />;
};

export default connect((state: AppState) => ({
    isLoggedIn: isLoggedIn(state),
}))(PrivateRoute);
