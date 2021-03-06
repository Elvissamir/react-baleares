import { Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import OptionsPage from './OptionsPage';
import RequireAuth from './RequireAuth';
import UsersPage from './UsersPage';
import routes from '../routes';
import NotFound from './NotFound';
import Forbidden from './Forbidden';
import ImageForm from './ImageForm';
import CreateUserForm from './CreateUserForm';
import EditUserForm from './EditUserForm'
import Welcome from './Welcome';

function Router() {
    return (
        <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path={routes.general.login.url} element={<LoginForm />} />
            <Route path={routes.auth.options.url} element={
                <RequireAuth 
                    redirectTo={routes.general.login.url} 
                    destination={routes.auth.options.url}
                    admin={false}>
                        <OptionsPage />
                </RequireAuth>} />
            <Route path={routes.auth.uploadImage.url} element={
                <RequireAuth 
                    redirectTo={routes.general.login.url}
                    destination={routes.auth.uploadImage.url}
                    admin={false}>
                    <ImageForm />
                </RequireAuth>} />
            <Route path={routes.admin.users.url} element={
                <RequireAuth 
                    redirectTo={routes.general.login.url}
                    destination={routes.admin.users.url}
                    admin={true}>
                    <UsersPage />
                </RequireAuth>} />
            <Route path={routes.admin.editUser.url} element={
                <RequireAuth 
                    redirectTo={routes.general.login.url} 
                    destination={routes.auth.options.url}
                    admin={true}>
                        <EditUserForm />
                </RequireAuth>} />
            <Route path={routes.admin.createUser.url} element={
                <RequireAuth 
                    redirectTo={routes.general.login.url} 
                    destination={routes.auth.options.url}
                    admin={true}>
                        <CreateUserForm />
                </RequireAuth>} />
            <Route path='/forbidden' element={ <Forbidden /> } />
            <Route path='*' element={ <NotFound /> } />
        </Routes>
    )
}

export default Router