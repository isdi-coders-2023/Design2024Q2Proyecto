import {connect} from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';
import {AppState} from '../../store/store';
import {isLoggedIn} from '../../store/auth/selectors';

interface PublicRouteProps {
    isLoggedIn: boolean;
    component: React.FC;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
    component: Component,
    isLoggedIn,
}) => {
    const location = useLocation();

    return !isLoggedIn ? (
        <Component />
    ) : (
        <Navigate to="/" state={{from: location}} replace />
    );
};

export default connect(
    (state: AppState) => ({
        isLoggedIn: isLoggedIn(state),
    }),
    () => ({}),
)(PublicRoute);
