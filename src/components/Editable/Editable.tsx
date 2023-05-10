import React, { FormEvent, useState } from 'react';
import { X } from 'react-feather';

import './Editable.scss';

type Props = {
  editableClass?: string
  onSubmit?: (value: string, boardId?: number) => void,
  text?: string,
  placeholder?: string,
  buttonText?: string,
  displayClass?: string,
  editClass?: string,
  boardId?: number,
};

export function Editable(props: Props) {
  const [showEdit, setShowEdit] = useState(false);
  const {
    editableClass,
    onSubmit,
    text,
    placeholder,
    buttonText,
    displayClass,
    editClass,
    boardId,
  } = props;
  const [inputValue, setInputValue] = useState(text || '');

  const handleSubmit = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (onSubmit) {
      if (buttonText === 'Add Board' || buttonText === 'Add Card') {
        if (boardId) {
          onSubmit(inputValue, boardId);
        } else {
          onSubmit(inputValue);
        }

        setInputValue('');
        setShowEdit(false);

        return;
      }

      onSubmit(inputValue);
    }

    setShowEdit(false);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setInputValue(text || '');
  };

  return (
    <div className={`editable ${editableClass || ''}`}>
      {showEdit
        ? (
          <form
            className={`editable__edit ${editClass || ''}`}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={inputValue}
              placeholder={placeholder || 'Enter item'}
              ref={input => input && input.focus()}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
            <div className="editable__edit__footer">
              <button type="submit">
                {buttonText || 'Add item'}
              </button>
              <X onClick={closeEdit} />
            </div>
          </form>
        )
        : (
          <button
            className={`editable__display ${displayClass || ''}`}
            type="button"
            onClick={() => {
              if (buttonText === 'Add Label' || buttonText === 'Add New Task') {
                setInputValue('');
              }

              setShowEdit(true);
            }}
          >
            {text || buttonText || 'Add item'}
          </button>
        )}
    </div>
  );
}
