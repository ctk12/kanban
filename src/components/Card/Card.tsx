import React, { useMemo, useState } from 'react';
import {
  Clock,
  CheckSquare,
  MoreHorizontal,
  ArrowUpCircle,
  ArrowDownCircle,
  Power,
} from 'react-feather';

import './Card.scss';
import { Chip } from '../Chip';
import { Dropdown } from '../Dropdown';
import { BoardPropType, CardPropType } from '../../types/types';
import { CardInfo } from './CardInfo';
import { CardMove } from './CardMove';

type ReOrderType = {
  boardId: number,
  cardId: number,
};

type Props = {
  card: CardPropType;
  removeCardOrBoard: (boardId: number, cardId?: number) => void;
  boardId: number,
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

export function Card(props: Props) {
  const [showMore, setShowMore] = useState(false);
  const [showCardInfo, setShowCardInfo] = useState(false);
  const [showCardMove, setShowCardMove] = useState(false);
  const {
    card,
    removeCardOrBoard,
    boardId,
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

  const showCardM = () => {
    setShowCardMove(true);
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleOnDragStart(e, boardId, id)}
      onDrop={(e) => handleOnDragEnd(e, boardId, id)}
      onDragOver={(e) => handleOnDragOver(e)}
      className="container"
    >
      {reoder.boardId === boardId && reoder.cardId === id && (
        <div className="container__reorder">
          <ArrowUpCircle onClick={() => reOderUp()} />
          <Power onClick={() => offReorder()} />
          <ArrowDownCircle onClick={() => reOderDown()} />
        </div>
      )}
      <div
        style={{
          flex: '90%',
        }}
      >
        {showCardInfo && (
          <CardInfo
            onClose={() => setShowCardInfo(false)}
            card={card}
            boardId={boardId}
            updateCard={updateCard}
          />
        )}
        {showCardMove && (
          <CardMove
            onClose={() => setShowCardMove(false)}
            boards={boards}
            sCardId={id}
            sBoardId={boardId}
            updateBoards={updateBoards}
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
                  onReorder={onReorder}
                  showCardM={showCardM}
                />
              )}
            </button>
          </div>
          <div
            className="card"
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
      </div>
    </div>
  );
}
