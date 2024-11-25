import React, { Component } from 'react';
import { connect } from 'react-redux';
import {makeMove} from "../store/features/todos/gameActions";

class Square extends Component {
    handleClick = () => {
        const { index, value, makeMove } = this.props;
        if (!value) {
            makeMove(index);
        }
    };

    render() {
        const { value } = this.props;
        return (
            <button
                className="w-16 h-16 border border-gray-400 flex items-center justify-center text-2xl font-bold"
                onClick={this.handleClick}
            >
                {value}
            </button>
        );
    }
}

const mapDispatchToProps = { makeMove };

export default connect(null, mapDispatchToProps)(Square);
