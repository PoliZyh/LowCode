

import { defineStore } from "pinia";


const useUserStore = defineStore("user", {

    state: () => ({


    }),

    getters: {

    },

    actions: {

    },

    persist: [
        {
            paths: ["user"],
            storage: localStorage
        },
        {
            paths: [],
            storage: sessionStorage
        }
    ]
})


export default useUserStore;