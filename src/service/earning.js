import axios from "axios";

export const getEarningsForUser = (nick) => {
    return axios.get(`/earning/user/${nick}`)
}

export const deleteEarning = (earningId) => {
    return axios.delete(`/earning/${earningId}`)
}

export const addEarning = (accountId, value, description) => {
    return axios.post("/earning", {accountId, value, description})
}

