import React from 'react';

// mock data
import { mockData } from '../data';
import { ITrello } from '../type';
import { DropResult } from 'react-beautiful-dnd';

interface ITrelloContext {
  trello?: ITrello | null;
  onDragEnd: (result: DropResult) => void
}

const TrelloContext = React.createContext<ITrelloContext>({
  trello: null,
  onDragEnd: () => {}
});


export const TrelloProvider = ({ children }: React.PropsWithChildren) => {
  const [trello, setTrello] = React.useState<ITrello | null>(mockData);

  // first render: memory A -> get trello initial
  // re-render:  memory B -> get trello new state
  const onDragEnd = React.useCallback((result: DropResult) => {
    console.log('onDragEnd: ', result)

    const { source, destination, draggableId, type } = result;

    if (!destination) return;

    // TODO: drag drop list
    if (type === 'LIST') {
      // code logic drag drop list

      return; // return early
    }

    const { index: sourceIndex, droppableId: sourceDroppableId } = source;
    const { index: destinationIndex, droppableId: destinationDroppableId } = destination;

    // TODO: drag drop card same list
    if (sourceDroppableId === destinationDroppableId) {
      const newCards = (trello?.lists || {})[sourceDroppableId].cards;
      newCards.splice(sourceIndex, 1); // delete index source
      newCards.splice(destinationIndex, 0, draggableId);

      const newTrello: any = {
        ...trello,
        lists: {
          ...trello?.lists || {},
          [sourceDroppableId]: {
            ...(trello?.lists || {})[sourceDroppableId],
            cards: newCards
          }
        }
      };
      setTrello(newTrello);
      return;
    } 
    // TODO: drag drop card different list
  }, [trello]);

  return (
    <TrelloContext.Provider
      value={{
        trello, 
        // actions
        onDragEnd,
      }}
    >
      {children}
    </TrelloContext.Provider>
  )
}

export const useTrelloContext = () => React.useContext(TrelloContext);