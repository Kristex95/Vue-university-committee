import {createStore} from 'vuex';
import {sendRequest} from "@/request";

const store = createStore({
    state: {
        isLoggedIn: !!localStorage.getItem("access_token"),
        isClient: true,
    },
    mutations: {
        login(state) {
            state.isLoggedIn = !!localStorage.getItem("access_token");
            if (state.isLoggedIn) state.isClient = true
        },
        setClient(state, value) {
            state.isClient = value !== "ADMIN";

        },
        logout(state) {
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            state.isLoggedIn = false;
            state.isClient = true
        }
    },
    actions: {
        async fetchClient({commit}) {
            if (localStorage.getItem("access_token")) {
                const resp = await sendRequest('/user/client', 'GET', null);
                if (resp.ok) {
                    const data = await resp.json()
                    commit('setClient', data['role'])
                } else {
                    commit('setClient', 'ABITURIENT')
                }
            }else {
                commit('setClient', 'ABITURIENT')
            }
        }
    }
})

export default store