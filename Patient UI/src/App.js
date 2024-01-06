// App.js
import React from 'react';
import './App.css';
import DiseaseComponent from './DiseaseComponent'
import PrescriptionComponent from './PrescriptionComponent';
import PromptComponent from './PromptComponent';
import DoctorComponet from './DoctorComponent'
import PatientComponent from './PatientComponent'
import DiseaseModComponent from './DiseaseModComponent';
import TranscriptComponent from './TranscriptComponent';
import PatientHistoryComponent from './PatientHistoryComponent';
import VitalsComponent from './VitalComponent';
import Acquisitions from './Acquisitions';
import VideoCall from './videocall';
import Button from '@mui/material/Button';
import ClearComponent from './ClearComponent';

const App = () => {
  return (
    <div className="app-container">
      <div className="logo-container">
        <div className="overview-title-max">Patient Engine</div></div>
      <div className="main-content">
        <div className="panel panel-zero">
          <div className="logo-container-left">halo</div>
        </div>
        <div className="panel panel-one">
          <div className="box zoom-video-box">
            <div className="overview-title">Video</div><VideoCall/></div>
          <div className="box editable-prescription-box"><div className="overview-title">Prescrition</div><div style={{ height: '15px' }}></div><PrescriptionComponent />
          </div>
        </div>
      
        <div className="panel panel-three">
          
        </div>
      </div>
    </div>
  );
};

export default App;
