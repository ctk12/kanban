export interface LabelPropType {
  text: string;
  color: string;
}

export interface TaskPropType {
  id: number,
  text: string,
  completed: boolean,
}

export interface CardPropType {
  id: number,
  title: string,
  tasks: TaskPropType[],
  labels: LabelPropType[],
  desc: string,
  date: string,
}

export interface BoardPropType {
  id: number,
  title: string,
  cards: CardPropType[],
}
