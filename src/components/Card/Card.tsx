import React, { useMemo, useState } from 'react';
import { Clock, CheckSquare, MoreHorizontal } from 'react-feather';

import './Card.scss';
import { Chip } from '../Chip';
import { Dropdown } from '../Dropdown';
import { CardPropType } from '../../types/types';
import { CardInfo } from './CardInfo';

type Props = {
  card: CardPropType;
  removeCardOrBoard: (boardId: number, cardId?: number) => void;
  boardId: number,
  handleOnDragEnter: (boardId: number, cardId: number) => void;
  handleOnDragEnd: (boardId: number, cardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: CardPropType) => void,
};

export function Card(props: Props) {
  const [showMore, setShowMore] = useState(false);
  const [showCardInfo, setShowCardInfo] = useState(false);
  const {
    card,
    removeCardOrBoard,
    boardId,
    handleOnDragEnter,
    handleOnDragEnd,
    updateCard,
  } = props;
  const {
    id,
    title,
    labels,
    date,
    tasks,
  } = card;

  const completedTasks = useMemo(() => {
    return tasks.filter(task => task.completed).length;
  }, [tasks]);

  return (
    <>
      {showCardInfo && (
        <CardInfo
          onClose={() => setShowCardInfo(false)}
          card={card}
          boardId={boardId}
          updateCard={updateCard}
        />
      )}
      <div className="morecard">
        <div className="morecard__more">
          <button
            type="button"
            onClick={() => setShowMore(state => !state)}
            onBlur={() => setShowMore(false)}
          >
            <MoreHorizontal />
            {showMore && (
              <Dropdown
                text="Delete Card"
                onClose={removeCardOrBoard}
                boardId={boardId}
                cardId={id}
              />
            )}
          </button>
        </div>
        <div
          className="card"
          draggable
          onDragEnter={() => handleOnDragEnter(boardId, id)}
          onDragEnd={() => handleOnDragEnd(boardId, id)}
          onClick={() => setShowCardInfo(true)}
          onKeyDown={(e) => e.key === 'Enter' && setShowCardInfo(true)}
          role="button"
          tabIndex={0}
        >
          <div className="card__top">
            <div className="card__top__labels">
              {labels.map(label => (
                <Chip
                  key={label.text}
                  label={label}
                />
              ))}
            </div>
          </div>

          <div className="card__title">
            {title}
          </div>
          <div className="card__footer">
            <p>
              {date && (
                <>
                  <Clock />
                  {date.split('-').reverse().join('-')}
                </>
              )}
            </p>
            <p>
              {tasks.length > 0 && (
                <>
                  <CheckSquare />
                  {`${completedTasks}/${tasks.length}`}
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
