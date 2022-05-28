import axios from "axios";

export const getExpensesForUser = (nick) => {
    return axios.get(`/expense/user/${nick}`)
}

export const deleteExpense = (expenseId) => {
    return axios.delete(`/expense/${expenseId}`);
}

export const addExpense = (accountId, value, description) => {
    return axios.post("/expense", {accountId, value, description});
}