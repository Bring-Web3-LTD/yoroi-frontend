import { BalanceType } from '../types/index';
interface Props {
    balance: BalanceType;
    setKeyword: (keyword: string) => void;
    isLoading: boolean;
    tooltipTitle: JSX.Element;
}
declare const PortfolioHeader: ({ balance, setKeyword, isLoading, tooltipTitle }: Props) => JSX.Element;
export default PortfolioHeader;
