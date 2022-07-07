import { observer } from 'mobx-react-lite';
import { Fragment, SyntheticEvent, useState } from 'react';
import { Button, List, ListItem } from 'semantic-ui-react';
import { Activity } from '../../../models/Activity';
import { useStore } from '../../../stores/store';

function ActivityList() {
	const [ target, setTarget ] = useState('');
	const { activityStore } = useStore();
	const { deleteActivity, activities } = activityStore;

	function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
		setTarget(e.currentTarget.name);
		deleteActivity(id);
	}

	return (
		<Fragment>
			<List as="ul">
				{activities.map((activity: Activity) => (
					<ListItem key={activity.id} as="li">
						<div>
							<h2>{activity.title}</h2>
						</div>
						<div>
							<div>
								<div>{activity.category}</div>
							</div>
							<div>
								<div>{activity.date}</div>
							</div>
							<div>
								<div>{activity.city}</div>
								<div>{activity.venue}</div>
							</div>
							<div>
								<Button onClick={() => activityStore.selectActivity(activity.id)}>View Details</Button>
								<Button
									name={activity.id}
									variant="danger"
									onClick={(e) => handleActivityDelete(e, activity.id)}
								>
									Delete Activity
								</Button>
							</div>
						</div>
					</ListItem>
				))}
			</List>
		</Fragment>
	);
}

export default observer(ActivityList);
