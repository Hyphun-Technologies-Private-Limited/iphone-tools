import AuthService from '@/utils/services/auth.service';
import { currentUser } from "../../constants/config";
const user = localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null;
export const auth = {
    namespaced: true,
    state: {
        currentUser: user ? user : null,
        status: user ? { loggedIn: true } : { loggedIn: false },
        isConnected: false,
        socketMessage:''
    },
    getters: {
        currentUser: state => state.currentUser,
    },
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        setProcessing(state, payload) {
            state.processing = payload
        },

        SOCKET_CONNECT(state) {
            state.isConnected = true;
        },

        SOCKET_DISCONNECT(state) {
            state.isConnected = false;
        },
        SOCKET_orderstatus(state, message) {
            state.socketMessage = message
        }
    }
};