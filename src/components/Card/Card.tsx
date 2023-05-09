import React, { useState } from 'react';
import { Clock, CheckSquare, MoreHorizontal } from 'react-feather';

import './Card.scss';
import { Chip } from '../Chip';
import { Dropdown } from '../Dropdown';

export function Card() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="card">
      <div className="card__top">
        <div className="card__top__labels">
          <Chip text="Frontend" color="green" />
        </div>
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
          {showMore && <Dropdown text="Delete Card" />}
        </button>
      </div>

      <div className="card__title">
        Card 1
      </div>
      <div className="card__footer">
        <p>
          <Clock />
          20 sept
        </p>
        <p>
          <CheckSquare />
          1/4
        </p>
      </div>
    </div>
  );
}
