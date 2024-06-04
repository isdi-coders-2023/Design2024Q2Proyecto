import {Link} from 'react-router-dom';

function NotFoundPage() {
    return (
        <section>
            <h1> Page not found - 404</h1>
            <p>
                <Link to={'/'}>Volver al inicio</Link>
            </p>
        </section>
    );
}

export default NotFoundPage;
