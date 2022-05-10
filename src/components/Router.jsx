import { Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import OptionsPage from './OptionsPage';
import UsersPage from './UsersPage';

function Router() {
    return (
        <Routes>
            <Route path='/login' element={<LoginForm />} />
            <Route path='/options' element={< OptionsPage />} />
            <Route path='/users' element={<UsersPage />} />
        </Routes>
    )
}

export default Router