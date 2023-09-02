
import { defineStore } from "pinia";
import type { ICustomeComponent } from "@/components/custome-components/types";

interface IContextmenuState {
    loackedComponents: Array<ICustomeComponent>;
    isActive: boolean;
}

const useContextmenuStore = defineStore('contextmenu', {

    state: (): IContextmenuState => ({
        loackedComponents: [],
        isActive: false,
    }),

    actions: {

        activeContextmenu() {
            this.isActive = true;
        },

        deactiveContextmenu() {
            this.isActive = false;
        }

    }


})



export default useContextmenuStore;