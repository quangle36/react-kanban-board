import React from 'react';
import { v4 as uuidv4 } from 'uuid';
// mock data
import { mockData } from '../data';
import { ICard, IListItem, ITrello } from '../type';
import { DropResult } from 'react-beautiful-dnd';

interface ITrelloContext {
	trello?: ITrello | null;
	onDragEnd: (result: DropResult) => void;
	onAddNewCard: (listId: string) => void;
	onAddNewList: () => void;
	onDeleteCard: (listId: string, cardId: string) => void;
	onDeleteList: (listId: string) => void;
}

const TrelloContext = React.createContext<ITrelloContext>({
	trello: null,
	onDragEnd: () => {},
	onAddNewCard: () => {},
	onAddNewList: () => {},
	onDeleteCard: () => {},
	onDeleteList: () => {},
});

export const TrelloProvider = ({ children }: React.PropsWithChildren) => {
	const [trello, setTrello] = React.useState<ITrello>(mockData);

	// first render: memory A -> get trello initial
	// re-render:  memory B -> get trello new state
	const onDragEnd = React.useCallback(
		(result: DropResult) => {
			const { source, destination, draggableId, type } = result;

			if (!destination) return;

			// TODO: drag drop list
			if (type === 'LIST') {
				// code logic drag drop list

				setTrello((prev) => {
					const newColumns = [...prev.columns];
					newColumns.splice(source.index, 1);
					newColumns.splice(destination.index, 0, draggableId);
					return {
						...prev,
						columns: newColumns,
					};
				});
				return; // return early
			}

			const { index: sourceIndex, droppableId: sourceDroppableId } = source;
			const { index: destinationIndex, droppableId: destinationDroppableId } =
				destination;

			// TODO: drag drop card same list
			if (sourceDroppableId === destinationDroppableId) {
				const newCards = (trello?.lists || {})[sourceDroppableId].cards;
				newCards.splice(sourceIndex, 1); // delete index source
				newCards.splice(destinationIndex, 0, draggableId);

				const newTrello: any = {
					...trello,
					lists: {
						...(trello?.lists || {}),
						[sourceDroppableId]: {
							...(trello?.lists || {})[sourceDroppableId],
							cards: newCards,
						},
					},
				};
				setTrello(newTrello);
				return;
			}
			// TODO: drag drop card different list
			setTrello((prev) => {
				const lists = JSON.parse(JSON.stringify(prev.lists));
				lists[sourceDroppableId].cards.splice(sourceIndex, 1);
				lists[destinationDroppableId].cards.splice(
					destinationIndex,
					0,
					draggableId
				);
				return {
					...prev,
					lists,
				};
			});
		},
		[trello]
	);

	const onAddNewCard = React.useCallback(
		(listId: any) => {
			const newCard: ICard = { id: uuidv4(), title: 'new', description: 'new' };
			setTrello((prev) => {
				const updatedList = {
					...prev?.lists[listId],
					cards: [...(prev?.lists[listId].cards ?? []), newCard.id],
				};

				return {
					...prev,
					lists: {
						...prev?.lists,
						[listId]: updatedList,
					},
					cards: {
						...prev?.cards,
						[newCard.id]: newCard,
					},
				};
			});
		},
		[trello]
	);

	const onAddNewList = React.useCallback(() => {
		const newList: IListItem = {
			id: uuidv4(),
			title: 'new list',
			cards: [],
		};
		setTrello((prev) => {
			return {
				...prev,
				lists: {
					...prev.lists,
					[newList.id]: newList,
				},
				columns: [...prev.columns, newList.id],
			};
		});
	}, [trello]);

	const onDeleteCard = React.useCallback(
		(listId: string, cardId: string) => {
			setTrello((prev) => {
				const newCardsInList = prev.lists[listId].cards.filter(
					(item) => item !== cardId
				);
				const newList = { ...prev.lists[listId], cards: newCardsInList };
				const { [cardId]: _, ...newCards } = prev.cards;
				return {
					...prev,
					lists: {
						...prev.lists,
						[listId]: newList,
					},
					cards: {
						...newCards,
					},
				};
			});
		},
		[trello]
	);

	const onDeleteList = React.useCallback(
		(listId: string) => {
			setTrello((prev) => {
				const newColumns = prev.columns.filter((column) => column !== listId);
				const { [listId]: _, ...newLists } = prev.lists;
				return {
					...prev,
					lists: newLists,
					columns: newColumns,
				};
			});
		},
		[trello]
	);

	return (
		<TrelloContext.Provider
			value={{
				trello,
				// actions
				onDragEnd,
				onAddNewCard,
				onAddNewList,
				onDeleteCard,
				onDeleteList,
			}}
		>
			{children}
		</TrelloContext.Provider>
	);
};

export const useTrelloContext = () => React.useContext(TrelloContext);
