import axios from "axios";

export default {
    register: async function (newUser) {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/users`, newUser);
    },
    login: async function (data) {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/users/login`, data);
    },
    loginWithGoogle: async function (data) {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/users/login/login-with-google`, data);
    },
    decodeToken: async function (token) {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/users/token-decode/${token}`);
    },

    findByUserName: async function (username) {
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/users?userName=${username}`)
    },
    findByEmail: async function (email) {
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/users?email=${email}`)
    },
    findById: async function (userId) {
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/users/${userId}`)
    },
    confirmEmail: async function (userId) {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/users/` + userId, {
            emailConfirm: true
        })
    },
    addIp: async function (userId, ipList) {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/users/` + userId, {
            ipAccept: ipList
        })
    },
    forgotPassword: async function (userId, password) {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/users/` + userId, {
            password
        })
    },
    newPassword: async function (userId, newPassword) {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/users/` + userId, {
            password: newPassword
        })
    },
}