import httpService from "./httpService"

const usersEndpoint = `${process.env.REACT_APP_API_URL}/users`
const loginEndpoint = `${process.env.REACT_APP_API_URL}/login`

function register (user) {
    return httpService.post(usersEndpoint, user)
}

function login ({ email, password }) {
    return httpService.post(`${loginEndpoint}`, { email, password })
}

export {
    register,
    login,
}