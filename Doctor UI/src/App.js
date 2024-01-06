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
        <div className="overview-title-max">Dashboard</div></div>
      <div className="main-content">
        <div className="panel panel-zero">
          <div className="logo-container-left">halo</div>
          <div className="button-container">
           <ClearComponent/>
          </div>
        </div>
        <div className="panel panel-one">
          <div className="box zoom-video-box">
            <div className="overview-title">Zoom Video</div><VideoCall/></div>
          <div className="box disease-box"><div className="overview-title">Diagnosis Engine</div><div style={{ height: '10px' }}></div><DiseaseModComponent/></div>
        </div>
        <div className="panel panel-two">
          <div className="box history-box">
            <div className="overview-title">Patient Overview</div><div style={{ height: '15px' }}></div><PatientHistoryComponent /></div>
          <div className="box patient-transcription-box"><div className="overview-title">Transcript</div><div style={{ height: '15px' }}></div> <TranscriptComponent/></div>
        </div>
        <div className="panel panel-three">
          <div className="box vitals-box">
            <div className="overview-title">Vitals History</div><VitalsComponent/></div>
          <div className="box text-prompts-box"><div className="overview-title">Prompts</div><div style={{ height: '15px' }}></div><PromptComponent/></div>
          <div className="box editable-prescription-box"><div className="overview-title">Prescrition</div><div style={{ height: '15px' }}></div><PrescriptionComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
