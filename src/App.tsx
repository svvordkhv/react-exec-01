
import React, {useState} from "react";
import LiveField from "./components/LiveField/LiveField";

const App = () => {
    const [status, setStatus] = useState("stop");

    const startLive = () => {
        setStatus("start");
    };

    const stopLive = () => {
        setStatus("stop");
    };

    return (
    <div>
        <div>
            <h3>Status: {status}</h3>
        </div>
        <LiveField height={10} width={20} status={status} />
        <div>
            <button onClick={startLive}>Start</button>
            <button onClick={stopLive}>Stop</button>
        </div>
    </div>
    );
};

export default App;
