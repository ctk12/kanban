import React from 'react';
import {
  X,
} from 'react-feather';
import { Modal } from '../../Modal';

import './CardMove.scss';
import { BoardPropType } from '../../../types/types';

type Props = {
  onClose: () => void,
  boards: BoardPropType[],
  sCardId: number,
  sBoardId: number,
  updateBoards: (
    sBoardId: number, sCardId: number, dBoardId: number) => void,
};

export function CardMove(props: Props) {
  const {
    onClose,
    boards,
    sCardId,
    sBoardId,
    updateBoards,
  } = props;

  return (
    <Modal onClose={onClose}>
      <div className="cardmove">
        <div className="cardmove__close">
          <X onClick={onClose} />
        </div>

        {boards.map(board => (
          <div key={board.id} className="cardmove__box">
            <button
              className="cardmove__box__title"
              type="button"
              onClick={() => {
                updateBoards(sBoardId, sCardId, board.id);
                onClose();
              }}
            >
              {board.title}
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
}
