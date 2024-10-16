import { TooltipProps } from '@mui/material/Tooltip';
interface Props extends TooltipProps {
    children: JSX.Element;
    title: JSX.Element;
}
export declare const Tooltip: ({ children, title, ...props }: Props) => JSX.Element;
export {};
