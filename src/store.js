import { createStore } from "vuex";

export default createStore({
    state: {
        loggedIn: window.sessionStorage.getItem('logged-in'),
        userData: JSON.parse(window.sessionStorage.getItem('user-data')),
        notifications: []
    },
    mutations: {
        login(state, payload) {
            state.loggedIn = true;
            state.userData = payload;
            window.sessionStorage.setItem('user-data', JSON.stringify(payload));
            window.sessionStorage.setItem('logged-in', true);
        },

        logout(state) {
            state.loggedIn = false;
            state.userData = null;
            window.sessionStorage.setItem('user-data', null);
            window.sessionStorage.setItem('logged-in', "");
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