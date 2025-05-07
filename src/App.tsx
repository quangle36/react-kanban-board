import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import TrelloList from "./TrelloList";
import { useTrelloContext } from "./contexts/TrelloContext";
import Button from "antd/es/button";

function App() {
  const { trello, onDragEnd, onAddNewList } = useTrelloContext();
  console.log("dataSource: ", trello);

  return (
    <>
      <header>
        <div className="header__container">
          <div className="header__logo" />
          <div className="header__right">
            <div className="header__avatar">
              <img src="/assets/images/avatar.jpg" alt="Avatar" />
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-lists" type="LIST" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  style={
                    {
                      // backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey',
                      // height: 400
                    }
                  }
                  className="listContainer"
                  {...provided.droppableProps}
                >
                  <>
                    {trello?.columns.map((column: string, index: number) => {
                      const listItem = trello.lists[column] || {};
                      const cards = (listItem.cards || []).map((cardId: string) => trello.cards[cardId] || {});
                      return <TrelloList key={listItem.id} index={index} cards={cards} listItem={listItem} />;
                    })}
                    {provided.placeholder}
                    <Button
                      type="text"
                      onClick={() => {
                        onAddNewList();
                      }}
                    >
                      Add another list
                    </Button>
                  </>
                </div>
              )}
            </Droppable>
            dsds
            {/* <div className="listContainer">
              
            </div> */}
          </DragDropContext>
        </div>
      </main>
    </>
  );
}

export default App;
