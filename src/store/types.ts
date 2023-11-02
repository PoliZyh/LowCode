import type { ICustomeComponent } from '@/components/custome-components/types'



export interface IRoutesMap {
    [key: string]: {
        components: ICustomeComponent[];
        pageName: string;
        date: string;
    }
}