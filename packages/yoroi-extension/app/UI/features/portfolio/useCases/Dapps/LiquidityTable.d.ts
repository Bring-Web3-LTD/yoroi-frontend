import { LiquidityItemType } from '../../common/types/index';
interface Props {
    data: LiquidityItemType[];
    isLoading: boolean;
}
declare const LiquidityTable: ({ data, isLoading }: Props) => JSX.Element;
export default LiquidityTable;
