import React, { useCallback } from 'react';
import { Card, Button, Tooltip, Popconfirm, Avatar } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { mockData } from './data';
import TrelloList from './TrelloList';

const { Meta } = Card;

function App() {
  const [dataSource, setDataSource] = React.useState<any>(mockData)
  console.log("dataSource: ", dataSource)

  const onBeforeCapture = useCallback(() => {
    /*...*/
  }, []);
  const onBeforeDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragUpdate = useCallback(() => {
    /*...*/
  }, []);
  const onDragEnd = useCallback(() => {
    // the only one that is required
  }, []);
  
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
          <DragDropContext
            onBeforeCapture={onBeforeCapture}
            onBeforeDragStart={onBeforeDragStart}
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
          >
            <Droppable droppableId="all-lists" type="LIST" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={{ 
                    // backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey',
                    // height: 400 
                  }}
                  className="listContainer"
                  {...provided.droppableProps}
                >
                  <>
                    {dataSource.columns.map((column: string, index: number) => {
                      const listItem = dataSource.lists[column] || {};
                      const cards = (listItem.cards || []).map((cardId: string) => dataSource.cards[cardId])

                      console.log('listItem: ', cards)
                      return (
                        <TrelloList 
                          key={listItem.id}
                          index={index}
                          cards={cards}
                          listItem={listItem}
                        />
                      )
                    })}
                    {provided.placeholder}
                  </>
                </div>
              )}
            </Droppable>
            {/* <div className="listContainer">
              
            </div> */}
          </DragDropContext>
        </div>
      </main> 
    </>
  )
}

export default App
