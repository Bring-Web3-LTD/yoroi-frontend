import { TokenType } from '../../common/types/index';
interface Props {
    tokenInfo: TokenType;
    isLoading: boolean;
}
declare const TokenDetailPerformance: ({ tokenInfo, isLoading }: Props) => JSX.Element;
export default TokenDetailPerformance;
