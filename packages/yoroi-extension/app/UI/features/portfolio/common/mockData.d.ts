import { BalanceType, LiquidityItemType, OrderItemType, TokenType } from './types';
import { TransactionItemType } from './types/transaction';
declare const mockData: {
    common: {
        walletBalance: BalanceType;
        dappsBalance: BalanceType;
    };
    wallet: {
        tokenList: TokenType[];
    };
    dapps: {
        liquidityList: LiquidityItemType[];
        orderList: OrderItemType[];
    };
    transactionHistory: TransactionItemType[];
};
export default mockData;
