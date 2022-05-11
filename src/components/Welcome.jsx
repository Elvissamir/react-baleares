import { NavLink } from 'react-router-dom';
import routes from '../routes';
import { useContext } from 'react';
import { UserContext } from './context/userContext';

function Welcome () {
    const { currentUser } = useContext(UserContext)

    const renderMessage = () => {
        if (!currentUser) {
            return (
                <div>
                    {
                        <div className='flex-col items-center justify-center'>
                            <p className='text-lg mx-auto text-center mt-5'>Please login to access the good stuff!</p>
                            <div className='mt-3 mx-auto flex justify-center'>
                                <NavLink 
                                className='button action-button' 
                                to={routes.general.login.url}>
                                    {routes.general.login.name}
                                </NavLink>
                            </div>
                        </div>
                    }
                </div>)
        }
        else 
            return <p className='text-lg mx-auto text-center mt-5'>Are you having a good time? :D</p>
    }

    return (
        <div className="content-wrapper">
            <p className="mx-auto text-4xl text-center font-bold">
                Welcome to User-Images Manager
            </p>
            {renderMessage()}
        </div>
    )
}

export default Welcome