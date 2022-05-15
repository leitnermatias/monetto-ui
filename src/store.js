import { createStore } from "vuex";

export default createStore({
    state: {
        loggedIn: window.localStorage.getItem('logged-in'),
        userData: JSON.parse(window.localStorage.getItem('user-data')),
        notifications: []
    },
    mutations: {
        login(state, payload) {
            state.loggedIn = true;
            state.userData = payload;
            window.localStorage.setItem('user-data', JSON.stringify(payload));
            window.localStorage.setItem('logged-in', true);
        },

        logout(state) {
            state.loggedIn = false;
            state.userData = null;
            window.localStorage.setItem('user-data', null);
            window.localStorage.setItem('logged-in', false);
        },

        changeNickname(state, payload) {
            state.userData.nick = payload;
        },

        changeEmail(state, payload) {
            state.userData.email = payload;
        },

        addNotification(state, payload) {
            state.notifications.push(payload);
        },

        removeNotifications(state) {
            state.notifications = [];
        },

        removeNotification(state, payload) {
            state.notifications.splice(payload, 1);
        }
    }
})