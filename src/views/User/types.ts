export interface IProjectInfoItem {
    name: string;
    description: string;
    projectId: number;
}

export interface IDocItem {
    title: string;
    children: Array<IDocChild>;
}

export interface IDocChild {
    title: string;
    content: string;
}