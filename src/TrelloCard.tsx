import { Draggable } from 'react-beautiful-dnd';
import { Card, Avatar } from 'antd';
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
	DeleteOutlined,
} from '@ant-design/icons';

import { ICard } from './type';
import { useTrelloContext } from './contexts/TrelloContext';

interface TrelloCardProps {
	card: ICard;
	index: number;
	listId: string;
}

const { Meta } = Card;

function TrelloCard({ card, index, listId }: TrelloCardProps) {
	const { onDeleteCard } = useTrelloContext();
	return (
		<Draggable draggableId={card.id} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className="card"
				>
					<Card
						cover={
							<img
								alt="example"
								src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
							/>
						}
						actions={[
							<SettingOutlined key="setting" />,
							<EditOutlined key="edit" />,
							<DeleteOutlined
								key="delete"
								onClick={() => {
									onDeleteCard(listId, card.id);
								}}
							/>,
						]}
					>
						<Meta
							avatar={
								<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
							}
							title={card.title}
							description={card.description}
						/>
					</Card>
				</div>
			)}
		</Draggable>
	);
}

export default TrelloCard;
