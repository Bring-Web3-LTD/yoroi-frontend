import React from 'react';
import { SubMenuOption } from '../types';
interface Props {
    options: SubMenuOption[];
    onItemClick: (route: string) => void;
    isActiveItem: (route: string) => boolean;
}
declare const Menu: ({ options, onItemClick, isActiveItem }: Props) => React.JSX.Element;
export default Menu;
