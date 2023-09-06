
import { defineStore } from 'pinia'
import type { ICustomeComponent } from '@/components/custome-components/types'
import { getCurDate } from '@/utils/date'

interface IEditorRoutesState {
    routesMap: {
        [key: string]: {
            components: ICustomeComponent[];
            pageName: string;
            date: string;
        }
    },
    curRoute: string;
    curPageName: string;
    isShowRouteSaveDialog: boolean;
}

const useEditorRoutesStore = defineStore('editorRoutes', {

    state: (): IEditorRoutesState => ({
        routesMap: {},
        curRoute: '',
        curPageName: '',
        isShowRouteSaveDialog: false, // 存储routeMap的组件是否可见
    }),

    actions: {

        setCurRouteInfo(route: string, pageName: string) {
            this.curRoute = route;
            this.curPageName = pageName;
        },

        showRouteSaveDialog(isShow: boolean) {
            this.isShowRouteSaveDialog = isShow;
        },

        setRoutesMap(components: ICustomeComponent[]) {
            this.routesMap[this.curRoute] = {
                components: components,
                pageName: this.curPageName,
                date: getCurDate()
            };
            console.log(this.routesMap);
        }

    }

})


export default useEditorRoutesStore