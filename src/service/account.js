import axios from "axios"

export const getAccountsForUser = (nick) => {
    return axios.get(`/account/user/${nick}`)
}

export const deleteAccount = (accountId) => {
    return axios.delete(`/account/${accountId}`)
}

export const addAccount = (nick) => {
    return axios.post(`/account/${nick}`)
}