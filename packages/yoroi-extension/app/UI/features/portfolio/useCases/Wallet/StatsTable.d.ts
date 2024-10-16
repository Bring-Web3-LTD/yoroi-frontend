import { TokenType } from '../../common/types/index';
interface Props {
    data: TokenType[];
    isLoading: boolean;
}
declare const StatsTable: ({ data, isLoading }: Props) => JSX.Element;
export default StatsTable;
