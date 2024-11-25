import React, { Component } from 'react';
import { connect } from 'react-redux';
import Square from './Square';
import {resetGame} from "../store/features/todos/gameActions";

class Board extends Component {
    handleReset = () => {
        this.props.resetGame();
    };

    render() {
        const { board, winner } = this.props;

        return (
            <div className="flex flex-col items-center">
                <div className="grid grid-cols-3 gap-2">
                    {board.map((value, index) => (
                        <Square key={index} index={index} value={value} />
                    ))}
                </div>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={this.handleReset}
                >
                    Сбросить игру
                </button>
                {winner && <p className="text-xl text-green-600 mt-4">{`Победитель: ${winner}`}</p>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    board: state.game.board,
    winner: state.game.winner,
});

const mapDispatchToProps = { resetGame };

export default connect(mapStateToProps, mapDispatchToProps)(Board);
