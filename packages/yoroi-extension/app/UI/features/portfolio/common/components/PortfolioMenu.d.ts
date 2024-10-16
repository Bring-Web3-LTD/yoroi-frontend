interface Props {
    onItemClick: (itemId: string) => void;
    isActiveItem: (itemId: string) => boolean;
}
declare const PortfolioMenu: (props: Props) => JSX.Element;
export default PortfolioMenu;
