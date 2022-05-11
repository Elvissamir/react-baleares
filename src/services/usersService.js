import httpService from "./httpService"

const usersEndpoint = `${process.env.REACT_APP_API_URL}/users`
const loginEndpoint = `${process.env.REACT_APP_API_URL}/login`

const register = (user) => {
    return httpService.post(usersEndpoint, user)
}

const login = ({ user, password }) => {
    return httpService.post(loginEndpoint, { user, password })
}

const getUsers = () => {
    return httpService.get(usersEndpoint)
}

const deleteUser = userName => {
    console.log(userName)
    console.log(`${usersEndpoint}/${{userName}}`)
    return httpService.delete(`${usersEndpoint}/${userName}`)
}

export {
    register,
    login,
    getUsers,
    deleteUser
}