// YourComponent.js
import React, { useEffect, useState } from 'react';
import firebase from './firebase'; // Import your Firebase configuration

const PatientHistoryComponent = () => {
    const [currentConnectionId, setCurrentConnectionId] = useState('SUxSMTBFNlFIS0xO');
    
    const [history, setHistory] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            // Reference to your Firebase database
            const dbRef = firebase.database().ref('/connectionId/currentConnectionId');
            
            const dbRefHistory = firebase.database().ref(`patientHistory/${currentConnectionId}/specific`);

            // Fetch data from Firebase



            try {
                const snapshot = await dbRef.once('value');
                const connectionId = snapshot.val();
                
                const snapshotHistory = await dbRefHistory.once('value');

                
                const historyData = snapshotHistory.val();

                if (connectionId) {
                    // Set the current connection ID in the component state
                    setCurrentConnectionId(connectionId);
                    
                    setHistory(historyData);
                    setHistory(historyData.replace(/\\n/g, '\n'));
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
        <div style={{ whiteSpace: 'pre-line' }}>
            {history.split('\n\n').map((paragraph, index, array) => (
                <React.Fragment key={index}>
                    {paragraph}
                    {index < array.length - 1 && (
                        <div className="faded-line"></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default PatientHistoryComponent;
