import { createStore } from "vuex";

export default createStore({
    state: {
        loggedIn: false,
        userData: null,
    },
    mutations: {
        login(state, payload) {
            state.loggedIn = true;
            state.userData = payload;
        },

        logout(state) {
            state.loggedIn = false;
            state.userData = null;
        }
    }
})