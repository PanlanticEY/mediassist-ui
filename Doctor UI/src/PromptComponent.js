// YourComponent.js
import React, { useEffect, useState } from 'react';
import firebase from './firebase'; // Import your Firebase configuration

const PromptComponent = () => {
    const [currentConnectionId, setCurrentConnectionId] = useState('SUxSMTBFNlFIS0xO');

    const [prompt, setPrompt] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            // Reference to your Firebase database
            const dbRef = firebase.database().ref('/connectionId/currentConnectionId');

            const dbRefDisease = firebase.database().ref(`meetingData/${currentConnectionId}/prompt`);

            // Fetch data from Firebase



            try {
                const snapshot = await dbRef.once('value');
                const connectionId = snapshot.val();

                const snapshotDisease = await dbRefDisease.once('value');


                const promptData = snapshotDisease.val();

                if (connectionId) {
                    // Set the current connection ID in the component state
                    setCurrentConnectionId(connectionId);

                    const splitByQuestionMark = (data) => {
                        return data.split(/\s*\?\s*/).filter(Boolean);
                    };

                    const result = splitByQuestionMark(promptData);
                    const resultWithQuestionMarks = result.map(item => `${item}?`);

                    console.log(resultWithQuestionMarks);

                    setPrompt(resultWithQuestionMarks);
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
            {prompt.map((item, index) => (
                <div key={index} className="prompt-item">
                    {item}
                </div>
            ))}
        </div>
    );
};

export default PromptComponent;
