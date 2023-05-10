import React, { useEffect, useState } from 'react';
import './App.scss';

import { Board } from './components/Board';
import { Editable } from './components/Editable';
import { BoardPropType, CardPropType } from './types/types';

type TargetType = {
  tboardId: number;
  tcardId: number;
};

let localStorageData: BoardPropType[] | [];

try {
  localStorageData = JSON.parse(
    localStorage.getItem('kanban') || JSON.stringify([]),
  );
} catch (error) {
  localStorageData = [];
}

export const App: React.FC = () => {
  const [target, setTarget] = useState<TargetType>({ tboardId: 0, tcardId: 0 });
  const [boards, setBoards] = useState<BoardPropType[] | []>(localStorageData);

  const findBoardIndex = (boardId: number) => {
    return boards.findIndex(board => board.id === boardId);
  };

  const findCardIndex = (boardId: number, cardId: number) => {
    const boardIndex = boards.findIndex(board => board.id === boardId);

    if (boardIndex >= 0) {
      const cardIndex = boards[boardIndex]
        .cards.findIndex(card => card.id === cardId);

      if (cardIndex >= 0) {
        return [boardIndex, cardIndex];
      }

      return [cardIndex];
    }

    return [boardIndex];
  };

  const addBoard = (title: string) => {
    const newBoard = {
      id: Date.now() + Math.round(Math.random() * 2),
      title,
      cards: [],
    };

    setBoards(state => [...state, newBoard]);
  };

  const addCard = (title: string, boardId?: number) => {
    const newCard = {
      id: Date.now() + Math.round(Math.random()),
      title,
      tasks: [],
      labels: [],
      desc: '',
      date: '',
    };

    setBoards(state => {
      const tempBoard = [...state];

      if (boardId) {
        const boardIndex = findBoardIndex(boardId);

        tempBoard[boardIndex].cards.push(newCard);
      }

      return tempBoard;
    });
  };

  const removeCardOrBoard = (boardId: number, cardId?: number) => {
    if (cardId) {
      const boardIndex = findBoardIndex(boardId);

      if (boardIndex >= 0) {
        setBoards(state => {
          const tempBoard = [...state];
          const cardRemoved = tempBoard[boardIndex].cards
            .filter(card => card.id !== cardId);

          tempBoard[boardIndex].cards = cardRemoved;

          return tempBoard;
        });
      }
    } else {
      setBoards(state => state.filter(board => board.id !== boardId));
    }
  };

  const handleOnDragEnd = (boardId: number, cardId: number) => {
    const { tboardId, tcardId } = target;
    const [sBoardIndex, sCardIndex] = findCardIndex(boardId, cardId);
    const [tBoardIndex, tCardIndex] = findCardIndex(tboardId, tcardId);

    if (sBoardIndex >= 0 && tBoardIndex >= 0
      && sCardIndex >= 0 && tCardIndex >= 0) {
      setBoards(state => {
        const tempBoard = [...state];
        const tempCard = tempBoard[sBoardIndex].cards[sCardIndex];

        tempBoard[sBoardIndex].cards.splice(sCardIndex, 1);
        tempBoard[tBoardIndex].cards.splice(tCardIndex, 0, tempCard);

        return tempBoard;
      });
    }
  };

  const handleOnDragEnter = (boardId: number, cardId: number) => {
    setTarget({
      tboardId: boardId,
      tcardId: cardId,
    });
  };

  const updateCard = (boardId: number, cardId: number, card: CardPropType) => {
    const [boardIndex, cardIndex] = findCardIndex(boardId, cardId);

    if (boardIndex >= 0 && cardIndex >= 0) {
      setBoards(state => {
        const tempBoard = [...state];

        tempBoard[boardIndex].cards[cardIndex] = card;

        return tempBoard;
      });
    }
  };

  useEffect(() => {
    localStorage.setItem('kanban', JSON.stringify(boards));
  }, [boards]);

  return (
    <div className="app">
      <div className="app__navbar">
        <h2>Kanban</h2>
      </div>

      <div className="app__outer">
        <div className="app__boards">
          {boards.map(board => (
            <Board
              key={board.id}
              board={board}
              removeCardOrBoard={removeCardOrBoard}
              addCard={addCard}
              handleOnDragEnter={handleOnDragEnter}
              handleOnDragEnd={handleOnDragEnd}
              updateCard={updateCard}
            />
          ))}
          <Editable
            displayClass="board__boards__add"
            editClass="board__boards__edit"
            placeholder="Enter Board Title"
            onSubmit={addBoard}
            buttonText="Add Board"
          />
        </div>
      </div>
    </div>
  );
};
