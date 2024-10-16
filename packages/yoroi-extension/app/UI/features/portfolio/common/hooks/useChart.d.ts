import React from 'react';
import { IChartData } from '../types/chart';
import { ITabButtonProps } from '../types';
declare const useChart: (data: IChartData) => {
    CustomYAxisTick: ({ x, y, payload, }: {
        x: number;
        y: number;
        payload: {
            value: number;
        };
    }) => React.SVGProps<SVGTextElement>;
    CustomActiveDot: ({ cx, cy, payload, index, dataLength, chartBottom, rectWidth, rectHeight, }: {
        cx: number;
        cy: number;
        payload: {
            time: string;
        };
        index: number;
        dataLength: number;
        chartBottom: number;
        rectWidth: number;
        rectHeight: number;
    }) => JSX.Element | React.ReactElement;
    handleChoosePeriod: (id: string) => void;
    handleMouseMove: (props: any) => void;
    handleMouseDown: (props: any) => void;
    handleMouseUp: () => void;
    periodButtonProps: ITabButtonProps[];
    detailInfo: {
        value: number;
        fiatValue: number;
    };
    minValue: number;
    maxValue: number;
    activePeriodId: string | number;
};
export default useChart;
