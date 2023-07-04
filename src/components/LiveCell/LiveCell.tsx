
import React, { FC } from 'react';
import { CellState } from "../../types/cell-state";
import "./LiveCell.css";

interface CellProps {
  x: number;
  y: number;
  status: CellState;
  cellClick: (x: number, y: number) => void;
}

const LiveCell: FC<CellProps> = ({x = 0, y = 0, status = CellState.DIE, cellClick}) => {
    return (
        <div className={`live-cell`} onClick={() => cellClick(x, y)} style={{backgroundColor: status === CellState.LIVE ? "#333333" : "darkgrey"}} > </div>
    );

};

export default LiveCell;
