import React, { Fragment } from 'react';
import { Button, Image, Loader } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';

function ActivityDetails() {
	const { activityStore } = useStore();
	const { selectedActivity: activity, openForm, cancelSelectedActivity } = activityStore;

	if (!activity) return <Loader />;

	return (
		<Fragment>
			<div style={{ width: '100%' }}>
				<div>
					<div>
						<div>{activity.title}</div>
						<Image src={`/assets/images/activities/${activity.category}.jpg`} />
						<div>
							<div>
								<div> {activity.date}</div>
							</div>
						</div>
						<div>
							<div>{activity.category}</div>
						</div>
						<div>
							<div>
								<Button onClick={() => openForm(activity.id)}>Edit</Button>

								<Button onClick={cancelSelectedActivity}>Close View</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
export default ActivityDetails;
