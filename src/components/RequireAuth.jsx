import { Navigate } from "react-router-dom"
import { useContext } from 'react';
import { UserContext } from "./context/userContext";

function RequireAuth ({ children, redirectTo, destination, admin }) {
    const { currentUser } = useContext(UserContext)

    if (!admin)
        return currentUser? children : <Navigate to={redirectTo} state={destination} replace />
    
    return currentUser?.isAdmin? children : <Navigate to='/forbidden' replace />
}

export default RequireAuth 