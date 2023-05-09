import React, { FormEvent, useState } from 'react';
import { X } from 'react-feather';

import './Editable.scss';

export function Editable(props: {
  onSubmit?: () => void,
  text?: string,
  placeholder?: string,
  buttonText?: string,
  displayClass?: string,
  editClass?: string,
}) {
  const [showEdit, setShowEdit] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    setShowEdit(false);

    if (props.onSubmit) {
      props.onSubmit();
    }
  };

  return (
    <div className="editable">
      {showEdit
        ? (
          <form
            className={`editable__edit ${props.editClass || ''}`}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              defaultValue={props.text}
              placeholder={props.placeholder || 'Enter item'}
              ref={input => input && input.focus()}
            />
            <div className="editable__edit__footer">
              <button
                type="submit"
                onClick={() => setShowEdit(false)}
              >
                {props.buttonText || 'Add'}
              </button>
              <X onClick={() => setShowEdit(false)} />
            </div>
          </form>
        )
        : (
          <button
            className={`editable__display ${props.displayClass || ''}`}
            type="button"
            // style={{
            //   width: '100%',
            //   border: 'none',
            //   fontSize: '1rem',
            // }}
            onClick={() => setShowEdit(true)}
          >
            {props.text || 'Add item'}
          </button>
        )}
    </div>
  );
}
