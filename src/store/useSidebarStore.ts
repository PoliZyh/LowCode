

import { defineStore } from "pinia";


interface ISidebarState {
    userSidebar: Array<ISidebarItem>
}

const useSidebarStore = defineStore('sidebar', {

    state: (): ISidebarState => ({
        userSidebar: [
            {
                title: '我的项目',
                routeName: 'Project',
            },
            {
                title: '帮助文档',
                routeName: 'HelpDoc'
            },

        ]
    })

})

export default useSidebarStore;