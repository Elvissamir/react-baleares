import axios from 'axios';
import auth from './authService'

axios.interceptors.request.use(function(config) {
    const token = auth.getJwt()
    if (token) {
        config.headers['x-auth-token'] = token
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => response, (error) => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) {
        // let the user know
    }
    
    return Promise.reject(error);
}); 

export default {
    get: axios.get, 
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}