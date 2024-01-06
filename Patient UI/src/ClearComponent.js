// PrescriptionComponent.js
import React, { useEffect, useState } from 'react';
import firebase from './firebase';

const ClearComponent = () => {
    const [currentConnectionId, setCurrentConnectionId] = useState('SUxSMTBFNlFIS0xO');
    const [prescription, setPrescription] = useState('');
    const [editablePrescription, setEditablePrescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            // Reference to your Firebase database
            const dbRef = firebase.database().ref(`/connectionId/${currentConnectionId}`);
            const dbRefPrescription = firebase.database().ref(`meetingData/${currentConnectionId}/prescription`);
            const dbRefDisease = firebase.database().ref(`meetingData/${currentConnectionId}/disease`);
            const dbRefPrompt = firebase.database().ref(`meetingData/${currentConnectionId}/prompt`);
            const dbRefPatientTranscript = firebase.database().ref(`meetingData/${currentConnectionId}/patientTranscript`);
            const dbRefDoctorTranscript = firebase.database().ref(`meetingData/${currentConnectionId}/doctorTranscript`);

            try {
                const snapshot = await dbRef.once('value');
                const connectionId = snapshot.val();

                if (connectionId) {
                    // Set the current connection ID in the component state
                    setCurrentConnectionId(connectionId);
                }

                const snapshotPrescription = await dbRefPrescription.once('value');
                const prescriptionData = snapshotPrescription.val();
                console.log('Prescription', prescriptionData);

                // Set prescription state
                setPrescription(prescriptionData);

                // Update editablePrescription based on prescriptionData
                setEditablePrescription(prescriptionData ? prescriptionData : '');
            } catch (error) {
                console.error('Error fetching data from Firebase:', error);
            }
        };

        fetchData();

        // Use the on method to listen for real-time changes
        const dbRefPrescription = firebase.database().ref(`meetingData/${currentConnectionId}/prescription`);
        const prescriptionListener = dbRefPrescription.on('value', (snapshot) => {
            const newPrescriptionData = snapshot.val();
            console.log('Prescription Updated:', newPrescriptionData);

            // Update prescription and editablePrescription states
            setPrescription(newPrescriptionData);
            setEditablePrescription(newPrescriptionData ? newPrescriptionData : '');
        });

        // Clean up the listener on component unmount
        return () => {
            dbRefPrescription.off('value', prescriptionListener);
        };
    }, [currentConnectionId]);

   

    const handleSave = () => {
        // Save the edited prescription data to Firebase

        const dbRefMeetingData = firebase.database().ref(`meetingData/${currentConnectionId}`);
        dbRefMeetingData.update({
            prescription: '',
            prompt: '',
            disease: '',
            doctorTranscript: '',
            patientTranscript: '',
        });
    };

    const handleChange = (event) => {
        // Update the editable prescription content as the user types
        setEditablePrescription(event.target.value);
    };

    return (
        <div>
            <button onClick={handleSave}>End Call</button>
        </div>
    );
};

export default ClearComponent;
