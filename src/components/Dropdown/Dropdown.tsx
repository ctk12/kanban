import React from 'react';

import './Dropdown.scss';

type Props = {
  text: string;
  onClose: (boardId: number, cardId?: number) => void;
  boardId: number;
  cardId?: number;
  onReorder: (boardId: number, cardId?: number) => void,
  showCardM?: () => void,
  setRename?: () => void,
  renameShow?: boolean,
};

export function Dropdown(props: Props) {
  const {
    text,
    onClose,
    boardId,
    cardId,
    onReorder,
    showCardM,
    setRename,
    renameShow,
  } = props;

  return (
    <div className="dropdown">
      {cardId && showCardM && (
        <a
          href="#move-to"
          onMouseDown={() => showCardM()}
        >
          Move to
        </a>
      )}
      {!renameShow && setRename && (
        <a
          href="#rename-board"
          onMouseDown={() => {
            setRename();
          }}
        >
          Rename
        </a>
      )}
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
