import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; 
import { Line } from 'react-chartjs-2';

const Acquisitions = () => {

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            label: 'My Dataset',
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        },
    ],
};

const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};


    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    );


};

export default Acquisitions;

