// import React, { useState } from 'react';
// import { sendPlayerMove } from './api';
// import Cell from './Cell';

// const rows = 6;
// const cols = 7;

// const checkForWinner = (board : string[][]): string | null => {
//     for (let row = 0; row < rows; ++row) {
//         for (let col = 0; col <= cols - 4; ++col) {
//             const cell = board[row][col];
//             if (cell !== "" &&
//                 cell === board[row][col + 1] &&
//                 cell === board[row][col + 2] &&
//                 cell === board[row][col + 3]
//             ) {
//                 return cell;
//             }
//         }
//     }
//     for (let col = 0; col < cols; ++col) {
//         for (let row = 0; row <= rows - 4; ++row) {
//             const cell = board[row][col];
//             if (cell !== "" &&
//                 cell === board[row + 1][col] &&
//                 cell === board[row + 2][col] &&
//                 cell === board[row + 3][col]
//             ) {
//                 return cell;
//             }
//         }
//     }
//     for (let row = 0; row <= rows - 4; ++row) {
//         for (let col = 0; col <= cols - 4; ++col) {
//             const cell = board[row][col];
//             if (cell !== "" &&
//                 cell === board[row + 1][col + 1] &&
//                 cell === board[row + 2][col + 2] &&
//                 cell === board[row + 3][col + 3]
//             ) {
//                 return cell;
//             }
//         }
//     }
//     for (let row = 3; row < rows; ++row) {
//         for (let col = 0; col <= cols - 4; ++col) {
//             const cell = board[row][col];
//             if (cell !== "" &&
//                 cell === board[row - 1][col + 1] &&
//                 cell === board[row - 2][col + 2] &&
//                 cell === board[row - 3][col + 3]
//             ) {
//                 return cell;
//             }
//         }
//     }
//     return null;
// };

// const Board: React.FC = () => {
//     const clear_board : string[][] = Array(rows).fill(Array(cols).fill(""));
//     const [isProcessing, setProcessing] = useState(false);
//     const [board, setBoard] = useState<string[][]>(clear_board);
//     const [currentPlayer, setCurrentPlayer] = useState<string>("Red");
//     const [winner, setWinner] = useState<string | null>(null);
//     const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

//     const handlePlayerMove = (cur_player : string, col: number, cur_board : string[][]) => {
//         const newBoard = cur_board.map(row => [...row]);
//         for (let row = rows - 1; row >= 0; --row) {
//             if (!newBoard[row][col]) {
//                 newBoard[row][col] = cur_player;
//                 break;  
//             }
//         }
//         return newBoard;
//     };
    

//     const handleClick = async (column: number) => {
//         if (winner) return;
//         if (isProcessing) return;
//         setProcessing(true);
    
//         try {
//             const newBoard = handlePlayerMove(currentPlayer, column, board);
//             setBoard(newBoard);
//             let cur_winner = checkForWinner(newBoard);
    
//             const response = await sendPlayerMove(currentPlayer, column, newBoard);
//             if (cur_winner) {
//                 setWinner(cur_winner);
//                 return;
//             }
//             const backendMoveBoard = handlePlayerMove((currentPlayer === "Red" ? "Yellow" : "Red"), response.column, newBoard);
//             setBoard(backendMoveBoard);
//             setWinner(checkForWinner(backendMoveBoard));
//         } catch (err) {
//             console.error("Ошибка:", err);
//         } finally {
//             setProcessing(false);
//         }
//     };

//     const resetGame = () => {
//         setBoard(clear_board);
//         setCurrentPlayer("Red");
//         setWinner(null);
//     };

//     return (
//         <div className="board">
//             {board.map((row, rowIndex) => (
//                 <div key={rowIndex} className="row">
//                     {row.map((cell, colIndex) => (
//                         <Cell key={colIndex} value={cell} onClick={() => handleClick(colIndex)} />
//                     ))}
//                 </div>
//             ))}
//             {winner && <h2>{winner} wins!</h2>}
//             <button onClick={resetGame}>Reset Game</button>
//         </div>
//     );
// };

// export default Board;
import React, { useState } from "react";

const rows = 6;
const cols = 7;

const Board: React.FC = () => {
    const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

    // Event handlers for mouse enter/leave
    const handleMouseEnter = (colIndex: number) => {
        setHoveredColumn(colIndex); // Set the hovered column index
    };

    const handleMouseLeave = () => {
        setHoveredColumn(null); // Clear the hovered column index
    };

    return (
        <div className="board">
            {Array.from({ length: rows }, (_, rowIndex) => (
                <div key={rowIndex} className="row">
                    {Array.from({ length: cols }, (_, colIndex) => (
                        <div
                            key={colIndex}
                            className={`cell ${
                                hoveredColumn === colIndex ? "highlight" : ""
                            }`}
                            onMouseEnter={() => handleMouseEnter(colIndex)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Content of the cell (optional) */}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
