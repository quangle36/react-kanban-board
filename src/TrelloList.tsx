import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Card, Button, Tooltip, Popconfirm } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import { ICard, IListItem } from "./type";
import TrelloCard from "./TrelloCard";
import { useTrelloContext } from "./contexts/TrelloContext";

interface TrelloListProps {
  listItem: IListItem;
  index: number;
  cards: ICard[];
}

function TrelloList({ listItem, index, cards }: TrelloListProps) {
  const { onAddNewCard, onDeleteList } = useTrelloContext();
  return (
    <Draggable draggableId={listItem.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="todoList">
          <Droppable droppableId={listItem.id} type="CARD" direction="vertical">
            {(provided) => (
              <Card
                title={listItem.title}
                className="cardList"
                size="small"
                extra={
                  <>
                    <Tooltip title="Add a card">
                      <Button
                        shape="circle"
                        icon={<PlusOutlined />}
                        style={{
                          marginRight: 10,
                        }}
                        onClick={() => {
                          onAddNewCard(listItem.id);
                        }}
                      />
                    </Tooltip>
                    <Popconfirm
                      title="Delete the list"
                      description="Are you sure to delete this list?"
                      onConfirm={() => {
                        onDeleteList(listItem.id);
                      }}
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
                <div ref={provided.innerRef} {...provided.droppableProps} className="trelloList_content">
                  {cards.map((card: any, index) => {
                    return <TrelloCard listId={listItem.id} key={card.id} index={index} card={card} />;
                  })}
                  {provided.placeholder}
                </div>
              </Card>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default TrelloList;
