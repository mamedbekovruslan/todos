import React, { Component } from 'react';
import Board from './components/Board';

class App extends Component {
  render() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-4xl font-bold mb-4">Крестики-Нолики</h1>
          <Board />
        </div>
    );
  }
}

export default App;
