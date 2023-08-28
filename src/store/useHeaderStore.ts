
import { defineStore } from "pinia";


interface IHeaderState {
    homeHeader: Array<IHeaderItem>;
    userHeader: Array<IHeaderItem>
}

const useHeaderStore = defineStore("header", {

    state: (): IHeaderState => ({
        homeHeader: [
            {
                title: "首页",
                routeName: 'Home'
            }
        ],
        userHeader: []
    })

})


export default useHeaderStore;