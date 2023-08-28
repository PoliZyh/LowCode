

import { defineStore } from "pinia";

interface IUserState {
    token: boolean;
}


const useUserStore = defineStore("user", {

    state: (): IUserState => ({
        token: false
    }),

    getters: {

    },

    actions: {

        setToken(newToken: boolean) {
            this.token = newToken
        }

    },

    persist: [
        {
            paths: [],
            storage: localStorage
        },
        {
            paths: ["token"],
            storage: sessionStorage
        }
    ]
})


export default useUserStore;