import React from 'react';
import Board from './Board/Board';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Connect Four</h1>
            <Board />
        </div>
    );
};

export default App;
