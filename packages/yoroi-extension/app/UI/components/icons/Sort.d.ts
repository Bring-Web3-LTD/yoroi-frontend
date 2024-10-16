import React from 'react';
interface Props {
    id: string;
    order: string | null;
    orderBy: string | null;
    style: any;
    onClick: () => void;
    props?: React.SVGProps<SVGSVGElement>;
}
export declare const Sort: ({ id, order, orderBy, style, onClick, ...props }: Props) => React.JSX.Element;
export {};
