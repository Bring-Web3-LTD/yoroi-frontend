import React from 'react';
type ModalState = {
    isOpen: boolean;
    title: string;
    content: React.ReactNode;
    height: string;
    width: string;
    isLoading: boolean;
};
export declare const useModal: () => any;
export declare const ModalProvider: ({ children, initialState }: {
    children: React.ReactNode;
    initialState?: ModalState;
}) => React.JSX.Element;
export {};
