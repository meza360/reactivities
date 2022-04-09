import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import { Activity } from '../models/Activity';
import NavBar from './navbar/NavigationBar';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import ActivityDashboard from '../../features/activities/activityDashboard/ActivityDashboard';

function App() {
	const [ selectedActivity, setSelectedActivity ] = useState<Activity | undefined>(undefined);
	const [ activities, setActivities ] = useState<Activity[]>([]);
	const [ editMode, setEditMode ] = useState(false);

	useEffect(() => {
		axios.get<Activity[]>('http://192.168.0.150:5000/api/activities').then((response) => {
			console.log(response);
			setActivities(response.data);
		});
	}, []);

	function handleSelectActivity(id: string) {
		setSelectedActivity(activities.find((x) => x.id === id));
	}

	function handleCancelSelectActivity() {
		setSelectedActivity(undefined);
	}

	function handleFormOpen(id?: string) {
		id ? handleSelectActivity(id) : handleCancelSelectActivity();
		setEditMode(true);
	}

	function handleFormClose() {
		setEditMode(false);
	}

	function handleCreateOrEditActivity(activity: Activity) {
		activity.id
			? setActivities([ ...activities.filter((x) => x.id !== activity.id), activity ])
			: setActivities([ ...activities, { ...activity, id: uuid() } ]);
		setEditMode(false);
		setSelectedActivity(activity);
	}

	function handleDeleteActivity(id: string) {
		setActivities([ ...activities.filter((x) => x.id !== id) ]);
	}
	return (
		<Fragment>
			<NavBar openForm={handleFormOpen} />
			<Container fluid className="mainAppContainer">
				<ActivityDashboard
					activities={activities}
					selectedActivity={selectedActivity}
					selectActivity={handleSelectActivity}
					cancelSelectActivity={handleCancelSelectActivity}
					editMode={editMode}
					openForm={handleFormOpen}
					closeForm={handleFormClose}
					createOrEdit={handleCreateOrEditActivity}
					deleteActivity={handleDeleteActivity}
				/>
			</Container>
		</Fragment>
	);
}

export default App;
