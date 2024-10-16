import React from 'react';
interface Props {
    label: string;
    onClick: () => void;
    variant: any;
    sx?: any;
    width?: string;
}
declare const NavigationButton: ({ label, onClick, variant, sx, width, ...props }: Props) => React.JSX.Element;
export default NavigationButton;
