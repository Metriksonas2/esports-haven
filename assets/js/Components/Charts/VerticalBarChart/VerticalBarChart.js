import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {generateMonthNamesForChart} from "../../../Services/functions";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const top = 'top';

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: top,
        },
        title: {
            display: true,
            text: 'Created tournaments for recent months',
        },
    },
};

const labels = generateMonthNamesForChart();

export const data = {
    labels,
    datasets: [
        {
            label: 'League of Legends',
            data: [5, 10, 3],
            backgroundColor: 'rgba(255, 194, 33, 0.5)',
        },
        {
            label: 'Dota 2',
            data: [2, 2, 2],
            backgroundColor: 'rgba(255, 68, 0, 0.5)',
        },
        {
            label: 'CS:GO',
            data: [1, 4, 0],
            backgroundColor: 'rgba(255, 123, 0, 0.5)',
        },
        {
            label: 'Rocket League',
            data: [2, 10, 1],
            backgroundColor: 'rgba(21, 57, 148, 0.5)',
        },
        {
            label: 'Valorant',
            data: [7, 15, 4],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
            label: 'Brawlhalla',
            data: [15, 11, 0],
            backgroundColor: 'rgba(66, 20, 122, 0.5)',
        },
    ],
};

const VerticalBarChart = () => {
    return <Bar options={options} data={data} />;
}

export default VerticalBarChart;
