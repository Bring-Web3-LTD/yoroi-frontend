import { OrderItemType } from '../../common/types/index';
interface Props {
    data: OrderItemType[];
    isLoading: boolean;
}
declare const OrderTable: ({ data, isLoading }: Props) => JSX.Element;
export default OrderTable;
