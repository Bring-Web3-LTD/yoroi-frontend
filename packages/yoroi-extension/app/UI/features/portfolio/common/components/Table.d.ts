import { ReactElement, ReactNode } from 'react';
import { IHeadCell } from '../types/table';
interface Props {
    name: string;
    headCells: IHeadCell[];
    data: any[];
    order: string | null;
    orderBy: string | null;
    handleRequestSort: (id: string) => void;
    isLoading: boolean;
    TableRowSkeleton: ReactElement;
    children: ReactNode;
}
declare const Table: ({ name, headCells, data, order, orderBy, handleRequestSort, isLoading, TableRowSkeleton, children, }: Props) => JSX.Element;
export default Table;
