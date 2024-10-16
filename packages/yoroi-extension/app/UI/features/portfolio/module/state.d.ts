export type CurrencyType = 'ADA' | 'USD' | 'BRL' | 'ETH' | 'BTC' | 'KRW' | 'CNY' | 'EUR' | 'JPY' | null;
export type PortfolioActions = {
    changeUnitOfAccount: (currency: CurrencyType) => void;
};
export declare const PortfolioActionType: Readonly<{
    changeUnitOfAccount: "changeUnitOfAccount";
}>;
export type PortfolioAction = {
    type: typeof PortfolioActionType.changeUnitOfAccount;
    unitOfAccount: CurrencyType;
};
export type PortfolioState = {
    unitOfAccount: CurrencyType;
    settingFiatPairUnit: {
        currency: CurrencyType;
        enabled: boolean;
    };
};
export declare const defaultPortfolioState: PortfolioState;
export declare const defaultPortfolioActions: PortfolioActions;
export declare const PortfolioReducer: (state: PortfolioState, action: PortfolioAction) => PortfolioState;
