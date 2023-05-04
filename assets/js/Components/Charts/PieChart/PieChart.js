import React, {useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {getGameColor, getGamesList} from "../../../Services/GameData";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (dataArray) => {
    const labels = getGamesList();
    console.log(dataArray)
    const getColors = (forBackground = false) => {
        let colors = [];

        if (forBackground) {
            labels.forEach((game) => {
                colors.push(getGameColor(game, 0.2));
            })
        } else {
            labels.forEach((game) => {
                colors.push(getGameColor(game, 1));
            })
        }

        return colors;
    }

    const getData = () => {
        let data = [];

        labels.forEach((game) => {
            data.push(dataArray.dataArray[game]);
        })

        return data;
    }

    const pieData= {
        labels: labels,
        datasets: [
            {
                label: 'No. of tournaments',
                data: getData(),
                backgroundColor: getColors(true),
                borderColor: getColors(false),
                borderWidth: 1,
            },
        ],
    };

    return (
        <Pie data={pieData} />
    );
}

export default PieChart;