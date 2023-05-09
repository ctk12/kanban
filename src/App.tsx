import React from 'react';
import './App.scss';

import { Board } from './components/Board';
import { Editable } from './components/Editable';

// interface Props {
//   onClick: () => void;
// }

export const App: React.FC = () => {
  return (
    <div className="app">
      <div className="app__navbar">
        <h2>Kanban</h2>
      </div>

      <div className="app__outer">
        <div className="app__boards">
          <Board />
          <Board />
          <Editable
            displayClass="board__boards__add"
            editClass="board__boards__edit"
            text="Add Board"
            placeholder="Enter Board Title"
          />
        </div>
      </div>
    </div>
  );
};
