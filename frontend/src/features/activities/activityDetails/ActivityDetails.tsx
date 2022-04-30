import React from 'react';
import { Badge, Card, CardGroup, CardImg, Container, Row, Button, Col, Stack } from 'react-bootstrap';
import Loader from '../../../app/layout/Loader';
import { Activity } from '../../../app/models/Activity';
import { useStore } from '../../../app/stores/store';
import ActivityForm from '../activityForm/ActivityForm';

function ActivityDetails() {
	const { activityStore } = useStore();
	const { selectedActivity: activity, openForm, cancelSelectedActivity } = activityStore;

	if (!activity) return <Loader />;

	return (
		<Container fluid="sm">
			<Card style={{ width: '100%' }}>
				<Card.Body>
					<Stack gap={3}>
						<Card.Title>{activity.title}</Card.Title>
						<CardImg src={`/assets/images/activities/${activity.category}.jpg`} />
						<Row>
							<Card.Text>
								<Badge pill bg="info">
									{' '}
									{activity.date}
								</Badge>
							</Card.Text>
						</Row>
						<Row>
							<Badge bg="secondary">{activity.category}</Badge>
						</Row>
						<Row>
							<Stack direction="vertical" gap={3}>
								<Button size="sm" onClick={() => openForm(activity.id)}>
									Edit
								</Button>

								<Button size="sm" variant="outline-secondary" onClick={cancelSelectedActivity}>
									Close View
								</Button>
							</Stack>
						</Row>
					</Stack>
				</Card.Body>
			</Card>
		</Container>
	);
}
export default ActivityDetails;
