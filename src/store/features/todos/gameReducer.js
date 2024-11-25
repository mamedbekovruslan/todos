const initialState = {
    board: Array(9).fill(null),
    winner: null,
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MAKE_MOVE':
            const { payload: index } = action;
            const currentPlayer = state.board.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
            const newBoard = state.board.slice();
            newBoard[index] = currentPlayer;

            return { ...state, board: newBoard };

        case 'SET_WINNER':
            return { ...state, winner: action.payload };

        case 'RESET_GAME':
            return initialState;

        default:
            return state;
    }
};

export default gameReducer;
