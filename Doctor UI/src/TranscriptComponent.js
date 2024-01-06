import React, { useEffect, useState } from 'react';
import firebase from './firebase'; // Import your Firebase configuration

const TranscriptComponent = () => {
    const [currentConnectionId, setCurrentConnectionId] = useState('SUxSMTBFNlFIS0xO');
    const [combinedTranscripts, setCombinedTranscripts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Reference to your Firebase database
            const dbRefPatientTranscript = firebase.database().ref(`meetingData/${currentConnectionId}/patientTranscript`);
            const dbRefDoctorTranscript = firebase.database().ref(`meetingData/${currentConnectionId}/doctorTranscript`);

            // Fetch data from Firebase
            try {
                const snapshotPatientTranscript = await dbRefPatientTranscript.once('value');
                const snapshotDoctorTranscript = await dbRefDoctorTranscript.once('value');

                const patientTranscriptData = snapshotPatientTranscript.val() || [];
                const doctorTranscriptData = snapshotDoctorTranscript.val() || [];
                console.log(patientTranscriptData);
                console.log(doctorTranscriptData);

                

                // Ensure that the data is an array
                const sanitizedDoctorTranscriptData = Array.isArray(doctorTranscriptData)
                    ? doctorTranscriptData
                    : doctorTranscriptData ? [doctorTranscriptData] : [];
                

                // Ensure that patientTranscriptData is an array or convert it into an array
                const sanitizedPatientTranscriptData = Array.isArray(patientTranscriptData)
                    ? patientTranscriptData
                    : patientTranscriptData ? [patientTranscriptData] : [];

                console.log('Doctor',sanitizedDoctorTranscriptData);
                console.log('Patient',sanitizedPatientTranscriptData);



                const timestampRegex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/g;

                // Function to split the message into various parts based on timestamps
                const splitMessageByTimestamp = (message) => {
                    const parts = message.split(timestampRegex);
                    const timestamps = message.match(timestampRegex);

                    if (!timestamps) {
                        return [`Doctor - ${message}`];
                    }

                    return timestamps.map((timestamp, index) => {
                        const trimmedPart = parts[index + 1].trim();
                        return `Doctor - ${timestamp}  ${trimmedPart}`;
                    });
                };

                // Use the function to split the message into various parts
                const splitDoctorTranscriptData = sanitizedDoctorTranscriptData.flatMap(message => splitMessageByTimestamp(message));

                // Log the result for verification
                console.log('Split Doctor Transcript Data:', splitDoctorTranscriptData);


                // Function to split the message into various parts based on timestamps
                const splitMessageByTimestampNew = (message) => {
                    const parts = message.split(timestampRegex);
                    const timestamps = message.match(timestampRegex);

                    if (!timestamps) {
                        return [`Patient - ${message}`];
                    }

                    return timestamps.map((timestamp, index) => {
                        const trimmedPart = parts[index + 1].trim();
                        return `Patient - ${timestamp}  ${trimmedPart}`;
                    });
                };

                const splitPatientTranscriptData = sanitizedPatientTranscriptData.flatMap(message => splitMessageByTimestampNew(message));

                // Log the result for verification
                console.log('Split Patient Transcript Data:', splitPatientTranscriptData);


                // Combine doctor and patient transcript data
                const combinedTranscriptData = [...splitDoctorTranscriptData, ...splitPatientTranscriptData];

                // Sort the combined array based on timestamps
                const sortedCombinedTranscriptData = combinedTranscriptData.sort((a, b) => {
                    const timestampA = new Date(a.match(timestampRegex)[0]);
                    const timestampB = new Date(b.match(timestampRegex)[0]);
                    return timestampA - timestampB;
                });

                setCombinedTranscripts(sortedCombinedTranscriptData);

                // Log the result for verification
                console.log('Sorted Combined Transcript Data:', sortedCombinedTranscriptData);

           


                
            } catch (error) {
                console.error('Error fetching data from Firebase:', error);
            }
        };

        fetchData();

        // Set up interval to fetch data every 5 seconds
        const intervalId = setInterval(fetchData, 2000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [currentConnectionId]); // Run on component mount and when connection ID changes

    return (
        <div style={{ whiteSpace: 'pre-line' }}>
            {combinedTranscripts.map((item, index) => (
                <div key={index}
                    style={{
                        backgroundColor: item.startsWith("Doctor") ? "#F5F5DC" : " #FF353B",
                        padding: "8px",
                        borderRadius: "10px",
                        marginBottom: "10px",
                    }}
                >
                    {item}
                    {" \n\n"}
                </div>
            ))}
        </div>
    );
};

export default TranscriptComponent;
