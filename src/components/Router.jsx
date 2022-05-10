import { Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import Options from './OptionsPage';

function Router() {
    return (
        <Routes>
            <Route path='/login' element={<LoginForm />} />
            <Route path='/options' element={< Options />} />
            <Router path='/users' element={<Users />} />
        </Routes>
    )
}

export default Router