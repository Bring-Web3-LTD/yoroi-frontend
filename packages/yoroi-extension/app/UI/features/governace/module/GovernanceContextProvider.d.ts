import * as React from 'react';
type GovernanceProviderProps = {
    children: React.ReactNode;
    currentWallet: any;
    createDrepDelegationTransaction: (drepCredential: String) => Promise<void>;
    txDelegationResult: any;
    txDelegationError: any;
    signDelegationTransaction: (params: any) => Promise<void>;
    tokenInfo: any;
    triggerBuySellAdaDialog: any;
};
export declare const GovernanceContextProvider: ({ children, currentWallet, createDrepDelegationTransaction, txDelegationResult, txDelegationError, signDelegationTransaction, tokenInfo, triggerBuySellAdaDialog, }: GovernanceProviderProps) => React.JSX.Element;
export declare const useGovernance: () => {
    walletId: string;
    governanceManager: null;
    checkUserPassword: (_password: string) => {
        new (body?: BodyInit | null, init?: ResponseInit): Response;
        prototype: Response;
        error(): Response;
        json(data: any, init?: ResponseInit): Response;
        redirect(url: string | URL, status?: number): Response;
    };
    txDelegationResult: null;
    txDelegationError: null;
    tokenInfo: null;
    getFormattedPairingAmount: (_amount: string) => {
        new (body?: BodyInit | null, init?: ResponseInit): Response;
        prototype: Response;
        error(): Response;
        json(data: any, init?: ResponseInit): Response;
        redirect(url: string | URL, status?: number): Response;
    };
    isHardwareWallet: boolean;
    createDrepDelegationTransaction: (_drepCredential: string) => Promise<{
        new (body?: BodyInit | null, init?: ResponseInit): Response;
        prototype: Response;
        error(): Response;
        json(data: any, init?: ResponseInit): Response;
        redirect(url: string | URL, status?: number): Response;
    }>;
    signDelegationTransaction: (_params: any) => Promise<{
        new (body?: BodyInit | null, init?: ResponseInit): Response;
        prototype: Response;
        error(): Response;
        json(data: any, init?: ResponseInit): Response;
        redirect(url: string | URL, status?: number): Response;
    }>;
    selectedWallet: null;
    walletAdaBalance: null;
    governanceStatus: {
        status: null;
        drep: null;
    };
    triggerBuySellAdaDialog: null;
    recentTransactions: never[];
    submitedTransactions: {
        isDrepDelegation: boolean;
    }[];
    governanceVoteChanged: (vote: any) => void;
    dRepIdChanged: (id: string) => void;
    governanceVote: any;
    dRepId?: string;
};
export {};
