
import { defineStore } from "pinia";


interface IHeaderState {
    header: Array<IHeaderItem>
}

const useHeaderStore = defineStore("header", {

    state: (): IHeaderState => ({
        header: [
            {
                title: "首页",
                routeName: 'Home'
            }
        ]
    })

})


export default useHeaderStore;