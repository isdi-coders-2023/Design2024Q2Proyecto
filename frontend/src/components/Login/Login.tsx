import {SubmitHandler, useForm} from 'react-hook-form';
import {connect} from 'react-redux';
import * as yup from 'yup';
import authSlice from '../../store/auth/authSlice';
import {selectLoginError, selectLoginLoading} from '../../store/auth/selectors';
import {AppDispatch, AppState} from '../../store/store';
import {AuthRequest} from '../../types/auth';
import Loader from '../Loader/Loader';
import {yupResolver} from '@hookform/resolvers/yup';

interface LoginPageProps {
    serverError: string | null;
    isLoading: boolean;
    handleLogin: ({username, password}: AuthRequest) => void;
}

const schema = yup.object().shape({
    username: yup
        .string()
        .required('Username required')
        .email('Bad email format'),
    password: yup
        .string()
        .required('Password required')
        .min(8, 'Password length must be gte 8 characters'),
});

export const LoginPage: React.FC<LoginPageProps> = ({
    serverError,
    isLoading,
    handleLogin,
}) => {
    const {handleSubmit, register} = useForm<AuthRequest>({
        defaultValues: {username: '', password: ''},
        resolver: yupResolver(schema),
    });
    const onSubmit: SubmitHandler<AuthRequest> = (data) => handleLogin(data);
    return (
        <div>
            <h1>Login</h1>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            {...register('username')}
                            id="username"
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            {...register('password')}
                            id="password"
                        />
                        <button type="submit">Enviar</button>
                    </form>
                    {serverError && <p>{serverError}</p>}
                </>
            )}
        </div>
    );
};

export default connect(
    (state: AppState) => ({
        serverError: selectLoginError(state),
        isLoading: selectLoginLoading(state),
    }),
    (dispatch: AppDispatch) => ({
        handleLogin: (payload: AuthRequest) =>
            dispatch(authSlice.actions.login(payload)),
    }),
)(LoginPage);
