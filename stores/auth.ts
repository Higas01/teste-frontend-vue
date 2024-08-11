import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({ isAuthenticated: false }),

    getters: {
        isLoggedIn(state) {
            return state.isAuthenticated;
        }
    },

    actions: {
        login() {
            this.isAuthenticated = true;
        }
    }
})