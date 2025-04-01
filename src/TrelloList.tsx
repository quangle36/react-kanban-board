import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Card, Button, Tooltip, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import { ICard, IListItem } from './type'
import TrelloCard from './TrelloCard';

interface TrelloListProps {
  listItem: IListItem,
  index: number,
  cards: ICard[]
}

function TrelloList({ listItem, index, cards }: TrelloListProps) {
  return (
    <Draggable 
      draggableId={listItem.id} 
      index={index} 
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='todoList'
        >
          <Droppable droppableId={listItem.id} type="CARD" direction='vertical'>
            {(provided, snapshot) => (
              
              <Card 
                title={listItem.title}
                className="cardList"
                size='small'
                extra={
                  <>
                    <Tooltip title="Add a card">
                      <Button shape="circle" icon={<PlusOutlined />} style={{
                      marginRight: 10
                    }} />
                    </Tooltip>
                    <Popconfirm
                      title="Delete the list"
                      description="Are you sure to delete this list?"
                      // onConfirm={confirm}
                      // onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Tooltip title="Delete list">
                        <Button shape="circle" icon={<DeleteOutlined />} />
                      </Tooltip>
                    </Popconfirm>
                  </>
                } 
                style={{ width: 300 }}
              >
                <div
                  ref={provided.innerRef}
                  // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                  {...provided.droppableProps}
                  className='trelloList_content'
                >
                  {cards.map((card: any, index) => {
                    return (
                      <TrelloCard 
                        key={card.id}
                        index={index}
                        card={card}
                      />
                    )
                  })}
                  {provided.placeholder}
                </div>
              </Card>
            )}
          </Droppable>
          
        </div>
      )}
    </Draggable>
  )
}

export default TrelloList