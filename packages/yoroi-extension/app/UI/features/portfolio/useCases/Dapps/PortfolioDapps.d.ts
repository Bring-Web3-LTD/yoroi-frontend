import React from 'react';
import { LiquidityItemType, OrderItemType } from '../../common/types/index';
interface Props {
    data: {
        liquidityList: LiquidityItemType[];
        orderList: OrderItemType[];
    };
}
declare const PortfolioDapps: ({ data }: Props) => React.JSX.Element;
export default PortfolioDapps;
