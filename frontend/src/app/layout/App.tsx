import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import { Activity } from '../models/Activity';
import NavBar from './navbar/NavigationBar';
import { v4 as uuid } from 'uuid';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import ActivityDashboard from '../../features/activities/activityDashboard/ActivityDashboard';
import agent from '../api/agent';
import Loader from './Loader';

function App() {
	const [ selectedActivity, setSelectedActivity ] = useState<Activity | undefined>(undefined);
	const [ activities, setActivities ] = useState<Activity[]>([]);
	const [ editMode, setEditMode ] = useState(false);
	const [ loading, setLoading ] = useState(true);
	const [ submitting, setSubmitting ] = useState(false);

	useEffect(() => {
		agent.Activities.list().then((response) => {
			console.log(response);

			//parsing date to just take date and ignore time for date picker html
			let activities: Activity[] = [];
			response.forEach((activity) => {
				activity.date = activity.date.split('T')[0];
				activities.push(activity);
			});
			setActivities(activities);
			setLoading(false);
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
		setSubmitting(true);
		if (activity.id) {
			agent.Activities.update(activity).then(() => {
				setActivities([ ...activities.filter((x) => x.id !== activity.id), activity ]);
				setSelectedActivity(activity);
				setEditMode(false);
				setSubmitting(false);
			});
		} else {
			activity.id = uuid();
			agent.Activities.create(activity).then(() => {
				setActivities([ ...activities, activity ]);
				setSelectedActivity(activity);
				setEditMode(false);
				setSubmitting(false);
			});
		}
	}

	function handleDeleteActivity(id: string) {
		setSubmitting(true);
		agent.Activities.delete(id).then(() => {
			setActivities([ ...activities.filter((x) => x.id !== id) ]);
			setSubmitting(false);
		});
	}

	if (loading) {
		return <Loader />;
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
