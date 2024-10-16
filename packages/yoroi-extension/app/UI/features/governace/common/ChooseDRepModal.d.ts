import * as React from 'react';
type ChooseDRepModallProps = {
    onSubmit?: (drepId: string, drepCredential: string) => void;
};
export declare const ChooseDRepModal: ({ onSubmit }: ChooseDRepModallProps) => React.JSX.Element;
export {};
