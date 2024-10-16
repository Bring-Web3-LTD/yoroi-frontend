export declare const ChipTypes: Readonly<{
    ACTIVE: "active";
    INACTIVE: "inactive";
    DISABLED: "disabled";
}>;
interface Props {
    label: JSX.Element;
    type: typeof ChipTypes[keyof typeof ChipTypes];
    sx?: any;
}
export declare const Chip: ({ label, type, sx, ...props }: Props) => JSX.Element;
export {};
