import React from 'react';
import { X } from 'react-feather';

import './Chip.scss';
import { LabelPropType } from '../../types/types';

type Props = {
  close?: (value: string) => void,
  onClose?: boolean,
  label: LabelPropType,
};

export function Chip(props: Props) {
  const { close, onClose, label } = props;
  const { text, color } = label;

  return (
    <div
      className="chip"
      style={{
        backgroundColor: color,
      }}
    >
      {text}
      {onClose
          && (
            <X
              onClick={() => {
                if (onClose && close) {
                  close(text);
                }
              }}
            />
          )}
    </div>
  );
}
