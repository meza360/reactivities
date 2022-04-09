import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Activity } from '../../../app/models/Activity';
import ActivityDetails from '../activityDetails/ActivityDetails';
import ActivityForm from '../activityForm/ActivityForm';
import ActivityList from '../activityList/ActivityList';

interface Props {
	activities: Activity[];
	selectedActivity: Activity | undefined;
	selectActivity: (id: string) => void;
	cancelSelectActivity: () => void;
	editMode: boolean;
	openForm: (id: string) => void;
	closeForm: () => void;

	//this below is temporal
	createOrEdit: (activity: Activity) => void;
	deleteActivity: (id: string) => void;
}

function ActivityDashboard({
	activities,
	selectedActivity,
	selectActivity,
	cancelSelectActivity,
	editMode,
	openForm,
	closeForm,
	createOrEdit,
	deleteActivity
}: Props) {
	return (
		<Container className="activityDashboardContainer">
			<Row>
				<Col md="8">
					<ActivityList
						activities={activities}
						selectActivity={selectActivity}
						deleteActivity={deleteActivity}
					/>
				</Col>

				<Col md="4">
					{selectedActivity &&
					!editMode && (
						<ActivityDetails
							activity={selectedActivity}
							cancelSelectActivity={cancelSelectActivity}
							openForm={openForm}
						/>
					)}
					{editMode && (
						<ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit} />
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default ActivityDashboard;
