export declare const mapStakingKeyStateToGovernanceAction: (state: any) => {
    kind: string;
    drepID?: undefined;
} | {
    kind: string;
    drepID: any;
} | null;
export declare const createCurrrentWalletInfo: (stores: any) => {
    currentPool: any;
    networkId: any;
    walletId: number;
    selectedWallet: any;
    walletAdaBalance: any;
    unitOfAccount: any;
    defaultTokenInfo: any;
    getCurrentPrice: any;
    recentTransactions: any;
    submitedTransactions: any;
    isHardwareWallet: boolean;
    backendService: any;
    backendServiceZero: any;
    stakingAddress: any;
};
export declare const getFormattedPairingValue: (getCurrentPrice: any, defaultTokenInfo: any, unitOfAccount: any, lovelaces: string) => string;
