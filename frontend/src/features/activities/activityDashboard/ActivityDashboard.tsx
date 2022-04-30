import React, { useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import ActivityStore from '../../../app/stores/activityStore';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../activityDetails/ActivityDetails';
import ActivityForm from '../activityForm/ActivityForm';
import ActivityList from '../activityList/ActivityList';
import { observer } from 'mobx-react-lite';
import Loader from '../../../app/layout/Loader';

function ActivityDashboard() {
	const { activityStore } = useStore();
	const { selectedActivity, editMode } = activityStore;

	useEffect(
		() => {
			activityStore.loadActivities();
		},
		[ activityStore ]
	);

	if (activityStore.loadingInitial) {
		return <Loader />;
	}

	return (
		<Container className="activityDashboardContainer">
			<Row>
				<Col md="8">
					<ActivityList />
				</Col>

				<Col md="4">
					{selectedActivity && !editMode && <ActivityDetails />}
					{editMode && <ActivityForm />}
				</Col>
			</Row>
		</Container>
	);
}

export default observer(ActivityDashboard);
