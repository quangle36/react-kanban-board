import React from 'react';
import { Card, Button, Tooltip, Popconfirm, Avatar } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { mockData } from './data';

const { Meta } = Card;

function App() {
  const [dataSource, setDataSource] = React.useState<any>(mockData)
  console.log("dataSource: ", dataSource)
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
          <div className="listContainer">
            {dataSource.columns.map((column: string) => {
              const listItem = dataSource.lists[column] || {};
              const cards = (listItem.cards || []).map((cardId: string) => dataSource.cards[cardId])

              return (
                <Card 
                  key={column}
                  title={listItem.title}
                  className="todoList"
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
                  <div className='trelloList_content'>
                    {cards.map((card: any) => {
                      return (
                        <Card
                          key={card.id}
                          cover={
                            <img
                              alt="example"
                              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                          }
                          actions={[
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                          ]}
                          className='card'
                        >
                          <Meta
                            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                            title={card.title}
                            description={card.description}
                          />
                        </Card>
                      )
                    })}
                    
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </main> 
    </>
  )
}

export default App
