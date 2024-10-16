import { TransactionItemType } from '../../common/types/transaction';
declare const TransactionTable: ({ history, tokenName }: {
    history: TransactionItemType[];
    tokenName: string;
}) => JSX.Element;
export default TransactionTable;
