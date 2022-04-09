import React, { Fragment } from 'react';
import { ListGroup, ListGroupItem, Card, Button, Col, Row, Badge, Container } from 'react-bootstrap';
import { Activity } from '../../../app/models/Activity';

interface Props {
	activities: Activity[];
	selectActivity: (id: string) => void;
	deleteActivity: (id: string) => void;
}

function ActivityList({ activities, selectActivity, deleteActivity }: Props) {
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
								<Button variant="primary" onClick={() => selectActivity(activity.id)}>
									View Details
								</Button>
								<Button variant="danger" onClick={() => deleteActivity(activity.id)}>
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

export default ActivityList;
