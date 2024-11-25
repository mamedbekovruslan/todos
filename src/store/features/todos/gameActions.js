export const makeMove = (index) => (dispatch, getState) => {
    const { game } = getState();
    if (game.winner) return;

    dispatch({ type: 'MAKE_MOVE', payload: index });

    // Check for winner
    const { board } = getState().game;
    const winner = calculateWinner(board);
    if (winner) {
        dispatch({ type: 'SET_WINNER', payload: winner });
    }
};

export const resetGame = () => ({ type: 'RESET_GAME' });

const calculateWinner = (board) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let line of lines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return null;
};
