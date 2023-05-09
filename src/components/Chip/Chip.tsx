import React from 'react';
import { X } from 'react-feather';

import './Chip.scss';

export function Chip(props: {
  text: string,
  close?: () => void,
  onClose?: boolean,
  color: string
}) {
  return (
    <div
      className="chip"
      style={{
        backgroundColor: props.color,
      }}
    >
      {props.text}
      {props.close
          && (
            <X
              onClick={() => {
                if (props.onClose && props.close) {
                  props.close();
                }
              }}
            />
          )}
    </div>
  );
}
