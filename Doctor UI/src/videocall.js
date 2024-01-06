import React, { useState } from 'react';
import AgoraUIKit from "agora-react-uikit";

const VideoCall = () => {
    const [videoCall, setVideoCall] = useState(true);

    const rtcProps = {
        appId: "",
        channel: "",
        token: "",
    };

    const callbacks = {
        EndCall: () => setVideoCall(false),
    };

    return videoCall ? (
        <div style={{ display: "flex", width: "25vw", height: "50vh" }}>
            <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
        </div>
    ) : (
        <h3 onClick={() => setVideoCall(true)}>Join</h3>
    );
};

export default VideoCall;