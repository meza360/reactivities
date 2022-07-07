import React, { Fragment, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Loader } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import ActivityDetails from './ActivityDetails';
import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';

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
		<Fragment>
			<div>
				<div>
					<ActivityList />
				</div>

				<div>
					{selectedActivity && !editMode && <ActivityDetails />}
					{editMode && <ActivityForm />}
				</div>
			</div>
		</Fragment>
	);
}

export default observer(ActivityDashboard);
