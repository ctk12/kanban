import React, { useEffect, useMemo, useState } from 'react';
import {
  Type,
  List,
  Calendar,
  Tag,
  CheckSquare,
  Trash,
  X,
} from 'react-feather';
import { Modal } from '../../Modal';
import { Editable } from '../../Editable';

import './CardInfo.scss';
import { CardPropType } from '../../../types/types';
import { Chip } from '../../Chip';

type Props = {
  onClose: () => void,
  card: CardPropType,
  boardId: number,
  updateCard: (boardId: number, cardId: number, card: CardPropType) => void,
};

export function CardInfo(props: Props) {
  const {
    onClose,
    card,
    boardId,
    updateCard,
  } = props;
  const colors = [
    '#a8193d',
    '#4fcc25',
    '#1ebffa',
    '#8da377',
    '#9975bd',
    '#cf61a1',
    '#240959',
  ];

  const [activeColor, setActiveColor] = useState(colors[0]);
  const [cardValues, setCardValues] = useState({ ...card });
  const {
    id,
    title,
    desc,
    labels,
    date,
    tasks,
  } = cardValues;

  const calculatePercent = useMemo(() => {
    if (tasks.length === 0) {
      return '0';
    }

    const completed = tasks.filter(task => task.completed).length;

    return `${completed * (100 / tasks.length)}%`;
  }, [tasks]);

  const updateCardTitle = (value: string) => {
    setCardValues(state => ({ ...state, title: value }));
  };

  const updateCardDesc = (value: string) => {
    setCardValues(state => ({ ...state, desc: value }));
  };

  const addCardDate = (value: string) => {
    setCardValues(state => ({ ...state, date: value }));
  };

  const addLabel = (value: string) => {
    const exitsLabel = labels.find(label => label.text === value);

    if (exitsLabel === undefined) {
      const newLabel = {
        text: value,
        color: activeColor,
      };

      setCardValues(state => ({ ...state, labels: [...labels, newLabel] }));
    }
  };

  const removeLabel = (value: string) => {
    const labelRemoved = labels.filter(label => label.text !== value);

    setCardValues(state => ({ ...state, labels: labelRemoved }));
  };

  const addTask = (value: string) => {
    const newTask = {
      id: Date.now() + Math.round(Math.random() * 2),
      text: value,
      completed: false,
    };

    setCardValues(state => ({ ...state, tasks: [...tasks, newTask] }));
  };

  const removeTask = (taskId: number) => {
    const taskRemoved = tasks.filter(task => task.id !== taskId);

    setCardValues(state => ({ ...state, tasks: taskRemoved }));
  };

  const taskToggle = (taskId: number) => {
    const taskUpdated = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }

      return task;
    });

    setCardValues(state => ({ ...state, tasks: taskUpdated }));
  };

  useEffect(() => {
    updateCard(boardId, id, cardValues);
  }, [cardValues]);

  return (
    <Modal onClose={onClose}>
      <div className="cardinfo">
        <div className="cardinfo__close">
          <X onClick={onClose} />
        </div>
        <div className="cardinfo__box">
          <div className="cardinfo__box__title">
            <Type />
            Title
          </div>
          <div className="cardinfo__box__body">
            <Editable
              text={title}
              buttonText="Update Title"
              placeholder="Enter Title"
              onSubmit={updateCardTitle}
            />
          </div>
        </div>

        <div className="cardinfo__box">
          <div className="cardinfo__box__title">
            <List />
            Description
          </div>
          <div className="cardinfo__box__body">
            <Editable
              text={desc}
              buttonText="Update Description"
              placeholder="Enter Description"
              onSubmit={updateCardDesc}
            />
          </div>
        </div>

        <div className="cardinfo__box">
          <div className="cardinfo__box__title">
            <Calendar />
            Date
          </div>
          <div className="cardinfo__box__body">
            <input
              type="date"
              defaultValue={date
                ? new Date(date).toISOString().substring(0, 10) : ''}
              onChange={(e) => addCardDate(e.target.value)}
            />
          </div>
        </div>

        <div className="cardinfo__box">
          <div className="cardinfo__box__title">
            <Tag />
            Labels
          </div>
          <div className="cardinfo__box__labels">
            {labels?.map(label => (
              <Chip
                key={label.text}
                label={label}
                onClose
                close={removeLabel}
              />
            ))}
          </div>
          <div className="cardinfo__box__colors">
            {colors.map(color => (
              <li
                key={color}
                style={{ backgroundColor: color }}
                className={`cardinfo__box__colors__li ${color === activeColor
                  ? 'active'
                  : ''}`}
                onClickCapture={() => setActiveColor(color)}
              >
              </li>
            ))}
          </div>
          <div className="cardinfo__box__body">
            <Editable
              buttonText="Add Label"
              placeholder="Enter Label"
              onSubmit={addLabel}
            />
          </div>
        </div>

        <div className="cardinfo__box">
          <div className="cardinfo__box__title">
            <CheckSquare />
            Tasks
          </div>
          <div className="cardinfo__box__progress">
            <div
              className={`cardinfo__box__progress-bar ${calculatePercent === '100%'
                ? 'cardinfo__box__progress-active'
                : ''}`}
              style={{ width: calculatePercent }}
            >
            </div>
          </div>
          <div className="cardinfo__box__list">
            {tasks?.map(task => (
              <div key={task.id} className="cardinfo__box__list__task">
                <input
                  type="checkbox"
                  onChange={() => taskToggle(task.id)}
                  checked={task.completed}
                />
                <p>{task.text}</p>
                <Trash onClick={() => removeTask(task.id)} />
              </div>
            ))}
          </div>
          <div className="cardinfo__box__body">
            <Editable
              buttonText="Add New Task"
              placeholder="Enter Task"
              onSubmit={addTask}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
