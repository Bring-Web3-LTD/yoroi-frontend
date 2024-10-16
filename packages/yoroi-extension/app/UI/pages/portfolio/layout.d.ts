import { ReactNode } from 'react';
type Props = {
    stores: any;
    actions: any;
    children: ReactNode;
};
declare const PortfolioLayout: ({ stores, actions, children }: Props) => JSX.Element;
export default PortfolioLayout;
