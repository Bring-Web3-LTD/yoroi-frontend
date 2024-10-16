import { IHeadCell } from '../types/table';
interface Props {
    headCells: IHeadCell[];
    order: string | null;
    orderBy: string | null;
    onRequestSort: (id: string) => void;
}
declare const SortableTableHead: ({ headCells, order, orderBy, onRequestSort }: Props) => JSX.Element;
export default SortableTableHead;
