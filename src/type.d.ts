export interface IListItem {
  id: string,
  title: string,
  cards: string[]
}

export interface ICard {
  id: string,
  description: string,
  title: string
}

export interface ITrello {
  columns: string[],
  lists: {
    [key in string]: IListItem
  },
  cards: {
    [key in string]: ICard
  }
}