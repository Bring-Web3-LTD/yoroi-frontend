import * as React from 'react';
import { CurrencyType } from './state';
type PortfolioProviderProps = {
    children: React.ReactNode;
    settingFiatPairUnit: {
        currency: CurrencyType;
        enabled: boolean;
    };
    initialState: {
        unitOfAccount: CurrencyType;
    };
};
export declare const PortfolioContextProvider: ({ children, settingFiatPairUnit, initialState, }: PortfolioProviderProps) => React.JSX.Element;
export declare const usePortfolio: () => {
    changeUnitOfAccount: (currency: CurrencyType) => void;
    unitOfAccount: CurrencyType;
    settingFiatPairUnit: {
        currency: CurrencyType;
        enabled: boolean;
    };
};
export {};
