
import React from 'react';
import "./LiveCell.css";

interface CellProps {
  x?: number;
  y?: number;
  status: boolean;
  cellClick: (x: number, y: number) => void;
}

const LiveCell: FC<CellProps> = ({x = 0, y = 0, status = false, cellClick}) => {
    return (
        <div className={`live-cell`} onClick={() => cellClick(x, y)} style={{backgroundColor: status ? "#333333" : "darkgrey"}} > </div>
    );

};

export default LiveCell;
