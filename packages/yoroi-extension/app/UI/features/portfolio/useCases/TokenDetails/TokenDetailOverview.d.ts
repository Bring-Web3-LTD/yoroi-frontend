import { TokenType } from '../../common/types/index';
interface Props {
    tokenInfo: TokenType;
    isLoading: boolean;
    isAda: boolean;
}
declare const TokenDetailOverview: ({ tokenInfo, isLoading, isAda }: Props) => JSX.Element;
export default TokenDetailOverview;
