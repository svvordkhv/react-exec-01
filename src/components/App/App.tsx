
import React, {useEffect, useState} from "react";
import { FieldState } from "../../types/field-state";
import LiveField from "../LiveField/LiveField";

import "./App.css";

const App = () => {
    const [status, setStatus] = useState(FieldState.STOP);
    const [statusText, setStatusText] = useState("Stop");

    useEffect(() => {
        setStatusText(status === FieldState.STOP ? "Stop" : "Start");
    }, [status]);

    const startLive = () => {
        setStatus(FieldState.START);
    };

    const stopLive = () => {
        setStatus(FieldState.STOP);
    };

    return (
    <div>
        <div>
            <h3>Status: {statusText}</h3>
        </div>
        <LiveField height={10} width={20} status={status} />
        <div className={'buttons'}>
            <button onClick={startLive}>Start</button>
            <button onClick={stopLive}>Stop</button>
        </div>
    </div>
    );
};

export default App;
