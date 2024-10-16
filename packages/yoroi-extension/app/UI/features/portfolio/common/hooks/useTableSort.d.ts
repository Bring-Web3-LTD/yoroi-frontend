import { IHeadCell } from '../types/table';
export interface ISortState {
    order: string | null;
    orderBy: string | null;
}
interface Props {
    order: string | null;
    orderBy: string | null;
    setSortState: React.Dispatch<React.SetStateAction<ISortState>>;
    headCells: IHeadCell[];
    data: any[];
}
declare const useTableSort: ({ order, orderBy, setSortState, headCells, data }: Props) => {
    getSortedData: (arr: any[]) => any[];
    handleRequestSort: (property: string) => void;
};
export default useTableSort;
