import React from 'react';
type StyledInputProps = {
    id: string;
    label: string;
    variant: string;
    onChange: (event: any) => void;
    value?: string;
    error?: boolean;
    helperText?: string;
};
export declare const TextInput: ({ id, label, onChange, value, error, helperText }: StyledInputProps) => React.JSX.Element;
export {};
