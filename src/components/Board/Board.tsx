import React, { useState } from 'react';
import { MoreHorizontal } from 'react-feather';

import './Board.scss';
import { Card } from '../Card';
import { Editable } from '../Editable';
import { Dropdown } from '../Dropdown';

export function Board() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="board">
      <div className="board__top">
        <p className="board__top__title">
          To Do
          <span>2</span>
        </p>
        <button
          type="button"
          // style={{
          //   position: 'relative',
          //   outline: 'none',
          //   border: 'none',
          //   backgroundColor: 'transparent',
          //   cursor: 'pointer',
          // }}
          onClick={() => setShowMore(state => !state)}
          onBlur={() => setShowMore(false)}
        >
          <MoreHorizontal />
          {showMore && <Dropdown text="Delete Board" />}
        </button>
      </div>

      <div className="board__cards custom-scroll">
        <Card />
        <Card />
        <Editable
          displayClass="board__cards__add"
          text="Add Card"
          placeholder="Enter Card Title"
        />
      </div>
    </div>
  );
}
