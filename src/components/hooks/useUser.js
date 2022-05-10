import { useState } from "react"
import auth from "../../services/authService"

function useUser () {
    const [ currentUser, setCurrentUser ] = useState(null)

    const mapUserProperties = ({ user, isAdmin }) => {
        return {
            user,
            isAdmin,
        }
    }

    const setCurrentUserFromToken = () => {
        const token = auth.getJwt()

        if (token) {
          const user = auth.getJwtData(token)
          setCurrentUser(user)
        }
    }

    const loginUser = (token) => {
        auth.login(token)
            
        const data = auth.getJwtData(token)
        const userData = mapUserProperties(data)
        setCurrentUser(userData)
    }

    const logoutUser = () => {
        auth.logout()
        setCurrentUser(null)
    }

    return {
            currentUser, 
            setCurrentUser, 
            setCurrentUserFromToken,
            loginUser,
            logoutUser
        }
}

export default useUser