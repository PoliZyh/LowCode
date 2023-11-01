export interface IMTableTitleItem {
    titleName: string;
    propName: string;
}

export interface IMTableDataItem {
    [key: string]: string | number;
}

export interface IMTableAttr {
    tableTitle: Array<IMTableTitleItem>;
    tableData: Array<IMTableDataItem>;
    isTitleBold: boolean;
    hasZebraStripe: boolean;
}