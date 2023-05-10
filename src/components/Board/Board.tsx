import React, { useState } from 'react';
import { MoreHorizontal } from 'react-feather';

import './Board.scss';
import { Card } from '../Card';
import { Editable } from '../Editable';
import { Dropdown } from '../Dropdown';

import { BoardPropType, CardPropType } from '../../types/types';

type Props = {
  board: BoardPropType;
  removeCardOrBoard: (boardId: number, cardId?: number) => void;
  addCard: (title: string, boardId?: number) => void;
  handleOnDragEnter: (boardId: number, cardId: number) => void;
  handleOnDragEnd: (boardId: number, cardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: CardPropType) => void,
};

export function Board(props: Props) {
  const [showMore, setShowMore] = useState(false);
  const {
    board,
    removeCardOrBoard,
    addCard,
    handleOnDragEnter,
    handleOnDragEnd,
    updateCard,
  } = props;
  const { id, title, cards } = board;

  return (
    <div className="board">
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
            handleOnDragEnter={handleOnDragEnter}
            handleOnDragEnd={handleOnDragEnd}
            updateCard={updateCard}
          />
        ))}
        <Editable
          displayClass="board__cards__add"
          buttonText="Add Card"
          placeholder="Enter Card Title"
          onSubmit={addCard}
          boardId={id}
        />
      </div>
    </div>
  );
}
