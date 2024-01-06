// YourComponent.js
import React, { useEffect, useState } from 'react';
import firebase from './firebase'; // Import your Firebase configuration

const DiseaseComponent = () => {
    const [currentConnectionId, setCurrentConnectionId] = useState('SUxSMTBFNlFIS0xO');
    
    const [disease, setDisease] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            // Reference to your Firebase database
            const dbRef = firebase.database().ref('/connectionId/currentConnectionId');
            
            const dbRefDisease = firebase.database().ref(`meetingData/${currentConnectionId}/disease`);

            // Fetch data from Firebase



            try {
                const snapshot = await dbRef.once('value');
                const connectionId = snapshot.val();
                
                const snapshotDisease = await dbRefDisease.once('value');

                
                const diseaseData = snapshotDisease.val();

                if (connectionId) {
                    // Set the current connection ID in the component state
                    setCurrentConnectionId(connectionId);
                    
                    setDisease(diseaseData);
                }
            } catch (error) {
                console.error('Error fetching data from Firebase:', error);
            }
        };

        fetchData();

        // Set up interval to fetch data every 5 seconds
        const intervalId = setInterval(fetchData, 2000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);


    }, []); // Run once on component mount

    return (
        <div>
           
            <h2>Disease: {disease}</h2>
            {/* Add additional components to display other data if needed */}
        </div>
    );
};

export default DiseaseComponent;
