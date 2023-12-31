

export interface ICommonAttr {
    left: number;
    top: number;
    width: number;
    height: number;
    opacity: number | null;
    fontSize: number | null;
    lineHeight: number | null;
    letterSpacing: number | null;
    color: string | null;
    backgroundColor: string | null;
    borderColor: string | null;
    borderWidth: number | null;
    borderRadius: number | null;
    textAlign: 'center' | 'left' | 'right' | null;
    rotate: number | null;
}

export interface ICommonAttrInputItem {
    label: string;
    inputType: 'text' | 'number' | 'select' | 'colorPicker';
    key: string;
    value: ICommonAttr[keyof ICommonAttr];
    selectOptions?: Array<ICommonAttrSelectOption>;
    isShow?: boolean;
}

export interface ICommonAttrSelectOption {
    label: string;
    value: string;
}


export interface ICanvasAttr {
    transparency: number;
    backgroundColor: string;
    width: number;
    height: number;
    scale: number;
}