import React from 'react';

import './Dropdown.scss';

type Props = {
  text: string;
  onClose: (boardId: number, cardId?: number) => void;
  boardId: number;
  cardId?: number;
};

export function Dropdown(props: Props) {
  const {
    text,
    onClose,
    boardId,
    cardId,
  } = props;

  return (
    <div className="dropdown">
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
