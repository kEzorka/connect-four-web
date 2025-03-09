import React from 'react';

interface CellProps {
    value: string;
    onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ value, onClick }) => {
    return (
        <div className={`cell ${value}`} onClick={onClick}>
            {value}
        </div>
    );
};

export default Cell;
