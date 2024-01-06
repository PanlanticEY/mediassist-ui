import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'; // Import Modal from react-modal
import firebase from './firebase';
import PrescriptionComponent from './PrescriptionComponent';


Modal.setAppElement('#root'); // Set the root element for accessibility

const ClearComponent = () => {
    const [currentConnectionId, setCurrentConnectionId] = useState('SUxSMTBFNlFIS0xO');
    const [prescription, setPrescription] = useState('');
    const [editablePrescription, setEditablePrescription] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false); // State to control the modal

    useEffect(() => {
        // ... (rest of your code)
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

        // Open the modal when the button is clicked
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        // Close the modal when needed (e.g., after saving data)
        setModalIsOpen(false);
    };

    const handleChange = (event) => {
        // Update the editable prescription content as the user types
        setEditablePrescription(event.target.value);
    };

    return (
        <div>
            <button onClick={handleSave}>End Call</button>

            {/* Modal component */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="End Call Modal"
            >
                <h2>End Call Confirmation</h2>
                <p><PrescriptionComponent/></p>
                <button onClick={handleCloseModal}>Cancel</button>
                {/* Add additional logic for confirming the end call */}
            </Modal>
        </div>
    );
};

export default ClearComponent;
