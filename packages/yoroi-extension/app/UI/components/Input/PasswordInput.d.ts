import React from 'react';
type StyledInputProps = {
    id: string;
    label: string;
    variant?: string;
    onChange: (event: any) => void;
    value?: string;
    error?: boolean;
    helperText?: string;
    disabled?: boolean;
};
export declare const PasswordInput: ({ id, label, onChange, value, error, disabled, helperText }: StyledInputProps) => React.JSX.Element;
export {};
