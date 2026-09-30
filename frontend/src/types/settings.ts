export interface BaseCurrencyType {
    code: string;
    value: string;
    symbol: string;
}

export interface DefaultAllocationType {
    _id: string;
    name: string;
}
export interface SettingsType {
    _id: string;
    userId: string;
    mode: string;
    theme: string;
    allocationMode: string;
    baseCurrency: BaseCurrencyType;
    defaultAllocations: DefaultAllocationType[];
}

export type BaseCurrencyDetailsType = Partial<SettingsType>;
