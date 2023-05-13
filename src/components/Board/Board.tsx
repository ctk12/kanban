import React, { useState } from 'react';
import {
  MoreHorizontal,
  ArrowLeftCircle,
  ArrowRightCircle,
  Power,
} from 'react-feather';

import './Board.scss';
import { Card } from '../Card';
import { Editable } from '../Editable';
import { Dropdown } from '../Dropdown';

import { BoardPropType, CardPropType } from '../../types/types';

type ReOrderType = {
  boardId: number,
  cardId: number,
};

type Props = {
  board: BoardPropType;
  removeCardOrBoard: (boardId: number, cardId?: number) => void;
  addCard: (title: string, boardId?: number) => void;
  handleOnDragStart: (
    e: React.DragEvent, boardId: number, cardId: number) => void;
  handleOnDragEnd: (e: React.DragEvent,
    boardId: number, cardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: CardPropType) => void,
  handleOnDragOver: (e: React.DragEvent) => void,
  reOderUp: () => void,
  onReorder: (boardId: number, cardId?: number) => void,
  offReorder: () => void,
  reoder: ReOrderType,
  reOderDown: () => void,
  updateBoards: (sBoardId: number, sCardId: number, dBoardId: number) => void,
  boards: BoardPropType[],
};

export function Board(props: Props) {
  const [showMore, setShowMore] = useState(false);
  const {
    board,
    removeCardOrBoard,
    addCard,
    handleOnDragStart,
    handleOnDragEnd,
    updateCard,
    handleOnDragOver,
    reOderUp,
    onReorder,
    offReorder,
    reoder,
    reOderDown,
    updateBoards,
    boards,
  } = props;
  const { id, title, cards } = board;

  return (
    <div className="board">
      {reoder.boardId === id && reoder.cardId === -1 && (
        <div className="board__reorder">
          <ArrowLeftCircle onClick={() => reOderUp()} />
          <Power onClick={() => offReorder()} />
          <ArrowRightCircle onClick={() => reOderDown()} />
        </div>
      )}
      <div className="board__top">
        <p className="board__top__title">
          {title}
          <span>
            &nbsp;
            {cards.length}
          </span>
        </p>
        <button
          type="button"
          onClick={() => setShowMore(state => !state)}
          onBlur={() => setShowMore(false)}
        >
          <MoreHorizontal />
          {showMore && (
            <Dropdown
              text="Delete Board"
              onClose={removeCardOrBoard}
              boardId={id}
              onReorder={onReorder}
            />
          )}
        </button>
      </div>

      <div className="board__cards custom-scroll">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            removeCardOrBoard={removeCardOrBoard}
            boardId={id}
            handleOnDragStart={handleOnDragStart}
            handleOnDragEnd={handleOnDragEnd}
            updateCard={updateCard}
            handleOnDragOver={handleOnDragOver}
            reOderUp={reOderUp}
            onReorder={onReorder}
            offReorder={offReorder}
            reoder={reoder}
            reOderDown={reOderDown}
            updateBoards={updateBoards}
            boards={boards}
          />
        ))}
        <Editable
          displayClass="board__cards__add"
          buttonText="Add Card"
          placeholder="Enter Card Title"
          onSubmit={addCard}
          boardId={id}
        />
        <div
          onDrop={(e) => handleOnDragEnd(e, id, -1)}
          onDragOver={(e) => handleOnDragOver(e)}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
          }}
        >
        </div>
      </div>
    </div>
  );
}
