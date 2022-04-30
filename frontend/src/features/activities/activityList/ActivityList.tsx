import { observer } from 'mobx-react-lite';
import React, { Fragment, SyntheticEvent, useState } from 'react';
import { ListGroup, ListGroupItem, Card, Button, Col, Row, Badge, Container } from 'react-bootstrap';
import { Activity } from '../../../app/models/Activity';
import { useStore } from '../../../app/stores/store';

function ActivityList() {
	const [ target, setTarget ] = useState('');
	const { activityStore } = useStore();
	const { deleteActivity, activities,loading } = activityStore;

	function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
		setTarget(e.currentTarget.name);
		deleteActivity(id);
	}

	return (
		<Container>
			<ListGroup as="ul">
				{activities.map((activity: Activity) => (
					<ListGroupItem key={activity.id} as="li">
						<Row>
							<h2>{activity.title}</h2>
						</Row>
						<Row>
							<Col xs>
								<Badge bg="secondary">{activity.category}</Badge>
							</Col>
							<Col xs>
								<Badge pill bg="info">
									{activity.date}
								</Badge>
							</Col>
							<Col>
								<Row>{activity.city}</Row>
								<Row>{activity.venue}</Row>
							</Col>
							<Col>
								<Button variant="primary" onClick={() => activityStore.selectActivity(activity.id)}>
									View Details
								</Button>
								<Button
									name={activity.id}
									variant="danger"
									onClick={(e) => handleActivityDelete(e, activity.id)}
								>
									Delete Activity
								</Button>
							</Col>
						</Row>
					</ListGroupItem>
				))}
			</ListGroup>
		</Container>
	);
}

export default observer(ActivityList);
