import { Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import OptionsPage from './OptionsPage';
import RequireAuth from './RequireAuth';
import UsersPage from './UsersPage';
import routes from '../routes';

function Router() {
    return (
        <Routes>
            <Route path={routes.general.login.url} element={<LoginForm />} />
            <Route path={routes.auth.options.url} element={
                <RequireAuth 
                    redirectTo={routes.general.login.url} 
                    destination={routes.auth.options.url}
                    admin={true}>
                        <OptionsPage />
                </RequireAuth>} />
            <Route path={routes.admin.users.url} element={<UsersPage />} />
        </Routes>
    )
}

export default Router