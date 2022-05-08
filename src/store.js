import { createStore } from "vuex";

export default createStore({
    state: {
        loggedIn: false,
        userData: null,
        notifications: []
    },
    mutations: {
        login(state, payload) {
            state.loggedIn = true;
            state.userData = payload;
        },

        logout(state) {
            state.loggedIn = false;
            state.userData = null;
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