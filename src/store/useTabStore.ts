import { defineStore } from "pinia";


interface ITabState {
    tabs: Array<ITabItem>;
}

const useTabStore = defineStore("tab", {
    state: (): ITabState => ({
        tabs: [
            {
                key: 0,
                title: '所有',
                iconName: 'Memo'
            },
            {
                key: 1,
                title: '我加入的',
                iconName: 'DocumentCopy'
            },
            {
                key: 2,
                title: '我创建的',
                iconName: 'DocumentChecked'
            },
            {
                key: 3,
                title: '待办',
                iconName: 'Collection'
            }
        ]
    })
})


export default useTabStore;