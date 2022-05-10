const general = {
    login: { name: 'Login', url: '/login' }
}

const auth = {
    options: { name: 'Options', url: '/options' },
    uploadImage: { name: 'Upload Image', url: '/upload' }
}

const admin = {
    users: { name: 'Users', url: '/users' }
}

const getAdminArr = function () {
    return Object.keys(this.admin).map(key => this.admin[key])
}

const getAuthArr = function () {
    return Object.keys(this.auth).map(key => this.auth[key])
}

const getGeneralArr = function () {
    return Object.keys(this.general).map(key => this.general[key])
}

const routes = {
    auth,
    general,
    admin,
    getAdminArr,
    getGeneralArr,
    getAuthArr
}

export default routes