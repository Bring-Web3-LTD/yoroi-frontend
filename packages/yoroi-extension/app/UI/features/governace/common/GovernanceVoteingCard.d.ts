import * as React from 'react';
type Props = {
    title: string;
    titleHover?: string;
    description: string;
    descriptionHover?: string;
    icon: React.ReactNode;
    selected: boolean;
    onClick: () => void;
    pending: boolean;
    loading: boolean;
};
export declare const GovernanceVoteingCard: ({ title, description, descriptionHover, titleHover, icon, selected, onClick, pending, loading, }: Props) => React.JSX.Element;
export {};
