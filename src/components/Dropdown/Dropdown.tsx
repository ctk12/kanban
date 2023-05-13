import React from 'react';

import './Dropdown.scss';

type Props = {
  text: string;
  onClose: (boardId: number, cardId?: number) => void;
  boardId: number;
  cardId?: number;
  onReorder: (boardId: number, cardId?: number) => void,
  showCardM?: () => void,
};

export function Dropdown(props: Props) {
  const {
    text,
    onClose,
    boardId,
    cardId,
    onReorder,
    showCardM,
  } = props;

  return (
    <div className="dropdown">
      <a
        href="#re-order"
        onMouseDown={() => {
          if (cardId) {
            onReorder(boardId, cardId);
          } else {
            onReorder(boardId);
          }
        }}
      >
        Re-Order
      </a>
      {cardId && showCardM && (
        <a
          href="#move-to"
          onMouseDown={() => showCardM()}
        >
          Move to
        </a>
      )}
      <a
        href="#delete"
        onMouseDown={() => {
          if (cardId) {
            onClose(boardId, cardId);
          } else {
            onClose(boardId);
          }
        }}
      >
        {text}
      </a>
    </div>
  );
}
