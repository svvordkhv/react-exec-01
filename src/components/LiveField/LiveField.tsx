
import  React, { useEffect, useRef, useState } from "react";
import { Live } from "../../app/Live";
import LiveCell from "../LiveCell/LiveCell";

import "./LiveField.css";

interface FieldProps {
  width?: number;
  height?: number;
  status: string;
}

const LiveField: FC<FieldProps> = ({width = 20, height = 10, status = "stop"}) => {
    const [liveCore, setLiveCore] = useState(new Live(width, height));
    const [liveField, setLiveField] = useState<boolean[][]>([]);
    const [liveWidth, setliveWidth] = useState(width);

    const timerRef = useRef<NodeJS.Timer>();

    useEffect(() => {
        if (status === "start") {
            timerRef.current = setInterval(() => {
                liveCore.nextGeneration();
                setLiveField(liveCore.getField());
            }, 100);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [status]);

    useEffect(() => {
        if (liveCore.getWidth() !== liveWidth) {
            setliveWidth(width);
        }
        if (liveCore.getWidth() !== width || liveCore.getHeight() !== height) {
            setLiveCore(new Live(width, height));
        }
    }, [height, width]);

    const cellClick = (x: number, y: number) => {
        liveCore.switchState(x, y);
        setLiveField(liveCore.getField());
    };

    useEffect(() => {
        liveCore.init();
        setLiveField(liveCore.getField());
    }, [liveCore]);

    return (
        <div className={'live-field'} style={{gridTemplateColumns: `repeat(${liveWidth}, 1fr)`}}>
            {liveField.map((row, y) => [
               ...(row.map((cell, x) => <LiveCell x={x} y={y} status={cell} cellClick={cellClick} key={`live-cell-${x}-${y}`} />))
            ])}
        </div>
    );
};

export default LiveField;
