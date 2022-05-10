import { Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';

function Router() {
    return (
        <Routes>
            <Route path='/login' element={<LoginForm />} />
        </Routes>
    )
}

export default Router