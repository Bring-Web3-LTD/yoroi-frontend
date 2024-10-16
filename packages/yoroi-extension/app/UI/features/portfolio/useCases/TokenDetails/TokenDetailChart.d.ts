import { TokenType } from '../../common/types/index';
interface Props {
    isLoading: boolean;
    tokenInfo: TokenType;
    isAda: boolean;
}
declare const TokenDetailChart: ({ isLoading, tokenInfo, isAda }: Props) => JSX.Element;
export default TokenDetailChart;
