import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import firebase from './firebase'; // Import your Firebase configuration

const VitalsComponent = () => {
    const [currentConnectionId, setCurrentConnectionId] = useState('SUxSMTBFNlFIS0xO');
    const [bloodPressureData, setBloodPressureData] = useState({});
    const [bloodSugarData, setBloodSugarData] = useState({});
    const [cholesterolData, setCholesterolData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            // Reference to your Firebase database
            const dbRefHistory = firebase.database().ref(`patientHistory/${currentConnectionId}/vitals`);

            try {
                const snapshotHistory = await dbRefHistory.once('value');
                const vitalsData = snapshotHistory.val();

                if (vitalsData) {
                    // Extract blood pressure data
                    const bloodPressure = vitalsData.bloodpressure || {};
                    setBloodPressureData(bloodPressure);

                    // Extract blood sugar data
                    const bloodSugar = vitalsData.bloodsugar || {};
                    setBloodSugarData(bloodSugar);

                    // Extract cholesterol data
                    const cholesterol = vitalsData.cholestrol || {};
                    setCholesterolData(cholesterol);
                }
            } catch (error) {
                console.error('Error fetching vitals data from Firebase:', error);
            }
        };

        fetchData();

        // Set up interval to fetch data every 5 seconds
        const intervalId = setInterval(fetchData, 2000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [currentConnectionId]); // Fetch data whenever the currentConnectionId changes

    const chartData = {
        labels: Object.keys(bloodPressureData),
        datasets: [
            {
                label: 'Blood Sugar (mg/dL)',
                data: Object.values(bloodSugarData),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.5, // Set tension for each dataset
            },
            {
                label: 'Blood Pressure (mm Hg)',
                data: Object.values(bloodPressureData),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.5, // Set tension for each dataset
            },
            {
                label: 'Cholesterol (mg/dL)',
                data: Object.values(cholesterolData),
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                tension: 0.5, // Set tension for each dataset
            },
        ],
    };

    const options = {
        animation: {
            tension: {
                duration:1000, // Set the duration of the tension animation
                easing: 'linear', // Set the easing function for the tension animation
                from: 1, // Set the starting tension value
                to: 0.5, // Set the ending tension value
                loop: true, // Enable looping
            },
        },
    };

    return (
        <div>
            
            <Line data={chartData} options={options} />
        </div>
    );
};

export default VitalsComponent;
