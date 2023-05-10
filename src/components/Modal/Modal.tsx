import React, { ReactNode } from 'react';

import './Modal.scss';

type Props = {
  children: ReactNode,
  onClose: () => void,
};

export function Modal({ children, onClose }: Props) {
  return (
    <div
      className="modal"
      onClick={() => onClose()}
      onKeyDown={() => ''}
      role="button"
      tabIndex={-1}
    >
      <div
        className="modal__content custom-scroll"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={() => ''}
        role="button"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
}
