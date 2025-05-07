import React from "react";
import { v4 as uuidv4 } from "uuid";
import { mockData } from "../data";
import { ICard, IListItem, ITrello } from "../type";
import { DropResult } from "@hello-pangea/dnd";

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

export const TrelloProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [trello, setTrello] = React.useState<ITrello | null>(mockData);

  const onDragEnd = React.useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId, type } = result;

      if (!destination || !trello) return;

      if (type === "LIST") {
        const newColumns = [...trello.columns];
        newColumns.splice(source.index, 1);
        newColumns.splice(destination.index, 0, draggableId);

        setTrello({ ...trello, columns: newColumns });
        return;
      }

      const sourceList = trello.lists[source.droppableId];
      const destinationList = trello.lists[destination.droppableId];
      const draggedCardId = draggableId;

      if (!sourceList || !destinationList) return;

      // Copy arrays to avoid mutating original state
      const sourceCards = [...sourceList.cards];
      const destinationCards =
        source.droppableId === destination.droppableId ? sourceCards : [...destinationList.cards];

      // Remove from source
      sourceCards.splice(source.index, 1);
      // Add to destination
      destinationCards.splice(destination.index, 0, draggedCardId);

      setTrello((prev) => {
        if (!prev) return prev;

        const updatedLists = {
          ...prev.lists,
          [source.droppableId]: {
            ...sourceList,
            cards: source.droppableId === destination.droppableId ? destinationCards : sourceCards,
          },
        };

        if (source.droppableId !== destination.droppableId) {
          updatedLists[destination.droppableId] = {
            ...destinationList,
            cards: destinationCards,
          };
        }

        return {
          ...prev,
          lists: updatedLists,
        };
      });
    },
    [trello]
  );

  const onAddNewCard = React.useCallback((listID: string) => {
    const newCard: ICard = {
      id: uuidv4(),
      title: "New Card",
      description: "",
    };

    setTrello((prev) => {
      if (!prev) return prev;
      const currentList = prev.lists[listID];
      if (!currentList) return prev;

      return {
        ...prev,
        lists: {
          ...prev.lists,
          [listID]: {
            ...currentList,
            cards: [...currentList.cards, newCard.id],
          },
        },
        cards: {
          ...prev.cards,
          [newCard.id]: newCard,
        },
      };
    });
  }, []);

  const onAddNewList = React.useCallback(() => {
    const newList: IListItem = {
      id: uuidv4(),
      title: "New List",
      cards: [],
    };

    setTrello((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        lists: {
          ...prev.lists,
          [newList.id]: newList,
        },
        columns: [...prev.columns, newList.id],
      };
    });
  }, []);

  const onDeleteCard = React.useCallback((listId: string, cardId: string) => {
    setTrello((prev) => {
      if (!prev) return prev;

      const updatedCardsInList = prev.lists[listId]?.cards.filter((id) => id !== cardId) ?? [];
      const { [cardId]: _, ...remainingCards } = prev.cards;

      return {
        ...prev,
        lists: {
          ...prev.lists,
          [listId]: {
            ...prev.lists[listId],
            cards: updatedCardsInList,
          },
        },
        cards: remainingCards,
      };
    });
  }, []);

  const onDeleteList = React.useCallback((listId: string) => {
    setTrello((prev) => {
      if (!prev) return prev;

      const newColumns = prev.columns.filter((id) => id !== listId);
      const { [listId]: _, ...remainingLists } = prev.lists;

      return {
        ...prev,
        columns: newColumns,
        lists: remainingLists,
      };
    });
  }, []);

  return (
    <TrelloContext.Provider
      value={{
        trello,
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
