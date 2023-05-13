import React, { useEffect, useState } from 'react';
import './App.scss';

import { Board } from './components/Board';
import { Editable } from './components/Editable';
import { BoardPropType, CardPropType } from './types/types';

type ReOrderType = {
  boardId: number,
  cardId: number,
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
  const [boards, setBoards] = useState<BoardPropType[] | []>(localStorageData);
  const [reoder, setReoder] = useState<ReOrderType>({
    boardId: -1,
    cardId: -1,
  });

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

  const handleOnDragDrop = (
    e: React.DragEvent,
    boardId: number,
    cardId: number,
  ) => {
    const sboardId = Number(e.dataTransfer.getData('boardId'));
    const scardId = Number(e.dataTransfer.getData('cardId'));

    if (cardId >= 0) {
      const [sBoardIndex, sCardIndex] = findCardIndex(sboardId, scardId);
      const [tBoardIndex, tCardIndex] = findCardIndex(boardId, cardId);

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
    } else {
      const tBoardIndex = findBoardIndex(boardId);
      const [sBoardIndex, sCardIndex] = findCardIndex(sboardId, scardId);

      if (sBoardIndex >= 0 && tBoardIndex >= 0 && sCardIndex >= 0) {
        setBoards(state => {
          const tempBoard = [...state];
          const tempCard = tempBoard[sBoardIndex].cards[sCardIndex];

          tempBoard[sBoardIndex].cards.splice(sCardIndex, 1);
          tempBoard[tBoardIndex].cards.push(tempCard);

          return tempBoard;
        });
      }
    }
  };

  const handleOnDragStart = (
    e: React.DragEvent,
    boardId: number,
    cardId: number,
  ) => {
    e.dataTransfer.setData('boardId', String(boardId));
    e.dataTransfer.setData('cardId', String(cardId));
  };

  const handleOnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
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

  const onReorder = (boardId: number, cardId = -1) => {
    setReoder({
      boardId,
      cardId,
    });
  };

  const offReorder = () => {
    setReoder({
      boardId: -1,
      cardId: -1,
    });
  };

  const reOderUp = () => {
    const { boardId, cardId } = reoder;

    if (boardId >= 0 && cardId >= 0) {
      const [sBoardIndex, sCardIndex] = findCardIndex(boardId, cardId);

      if (sBoardIndex >= 0 && sCardIndex > 0) {
        const [tBoardIndex, tCardIndex] = [sBoardIndex, sCardIndex - 1];

        setBoards(state => {
          const tempBoard = [...state];
          const tempCard = tempBoard[sBoardIndex].cards[sCardIndex];

          tempBoard[sBoardIndex].cards.splice(sCardIndex, 1);
          tempBoard[tBoardIndex].cards.splice(tCardIndex, 0, tempCard);

          return tempBoard;
        });
      }
    } else if (boardId >= 0) {
      const tBoardIndex = findBoardIndex(boardId);

      if (tBoardIndex >= 0) {
        setBoards(state => {
          const tempBoard = [...state];
          const temp = tempBoard[tBoardIndex];

          tempBoard.splice(tBoardIndex, 1);
          tempBoard.splice(tBoardIndex - 1, 0, temp);

          return tempBoard;
        });
      }
    }
  };

  const reOderDown = () => {
    const { boardId, cardId } = reoder;

    if (boardId >= 0 && cardId >= 0) {
      const [sBoardIndex, sCardIndex] = findCardIndex(boardId, cardId);

      if (sBoardIndex >= 0 && sCardIndex < boards[sBoardIndex].cards.length) {
        const [tBoardIndex, tCardIndex] = [sBoardIndex, sCardIndex + 1];

        setBoards(state => {
          const tempBoard = [...state];
          const tempCard = tempBoard[sBoardIndex].cards[sCardIndex];

          tempBoard[sBoardIndex].cards.splice(sCardIndex, 1);
          tempBoard[tBoardIndex].cards.splice(tCardIndex, 0, tempCard);

          return tempBoard;
        });
      }
    } else if (boardId >= 0) {
      const tBoardIndex = findBoardIndex(boardId);

      if (tBoardIndex >= 0) {
        setBoards(state => {
          const tempBoard = [...state];
          const temp = tempBoard[tBoardIndex];

          tempBoard.splice(tBoardIndex, 1);
          tempBoard.splice(tBoardIndex + 1, 0, temp);

          return tempBoard;
        });
      }
    }
  };

  const updateBoards = (
    sBoardId: number,
    sCardId: number,
    dBoardId: number,
  ) => {
    if (sBoardId === dBoardId) {
      return;
    }

    const tBoardIndex = findBoardIndex(dBoardId);
    const [sBoardIndex, sCardIndex] = findCardIndex(sBoardId, sCardId);

    if (sBoardIndex >= 0 && tBoardIndex >= 0 && sCardIndex >= 0) {
      setBoards(state => {
        const tempBoard = [...state];
        const tempCard = tempBoard[sBoardIndex].cards[sCardIndex];

        tempBoard[sBoardIndex].cards.splice(sCardIndex, 1);
        tempBoard[tBoardIndex].cards.push(tempCard);

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
              handleOnDragStart={handleOnDragStart}
              handleOnDragEnd={handleOnDragDrop}
              updateCard={updateCard}
              handleOnDragOver={handleOnDragOver}
              reOderUp={reOderUp}
              reOderDown={reOderDown}
              onReorder={onReorder}
              offReorder={offReorder}
              reoder={reoder}
              updateBoards={updateBoards}
              boards={boards}
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
