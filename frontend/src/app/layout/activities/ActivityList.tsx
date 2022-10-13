import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Item, Segment } from 'semantic-ui-react';
import ComponentLoader from '../../components/ComponentLoader';
import { Activity } from '../../models/Activity';
import { useStore } from '../../stores/store';
import { format } from 'date-fns';

function ActivityList() {
	const { activityStore } = useStore();
	const { deleteActivity, loadingInitial, loadActivities } = activityStore;
	const { groupedActivities } = activityStore;

	useEffect(
		() => {
			loadActivities();
		},
		[ activityStore, loadActivities ]
	);

	return loadingInitial ? (
		<ComponentLoader content={'Loading activities...'} />
	) : (
		<Fragment>
			{groupedActivities.map(([ group, activities ]) => (
				<Fragment key={group}>
					<Header>{group}</Header>
					<Segment>
						<Item.Group>
							{activities.map((activity: Activity) => (
								<Segment key={activity.id}>
									<Item>
										<Item.Content>
											<Item.Image
												size="tiny"
												circular
												src="/assets/images/icons/user.png"
												alt="Usr image"
											/>
											<Item.Header as={Link} to={`/activities/${activity.id}`}>
												{activity.title}
											</Item.Header>
											<Item.Description>Hosted by: {'Me'}</Item.Description>
											<Segment>
												<Icon name="clock" />
												{format(activity.date, 'dd MMM YYY h:mm aa')}
												<Icon name="marker" />
												{activity.city},{activity.venue}
											</Segment>

											<Segment secondary>Attendes go here</Segment>
											<Segment clearing>
												<Item.Description>{activity.category}</Item.Description>
												<Item.Group>
													<Button
														floated="right"
														color="teal"
														as={Link}
														to={`/activities/${activity.id}`}
													>
														<Icon name="list alternate" />View Details
													</Button>
													<Button
														secondary
														floated="right"
														onClick={() => deleteActivity(activity.id)}
													>
														<Icon name="trash" />
														Delete Activity
													</Button>
												</Item.Group>
											</Segment>
											<Item.Content />
										</Item.Content>
									</Item>
								</Segment>
							))}
						</Item.Group>
					</Segment>
				</Fragment>
			))}
		</Fragment>
	);
}

export default observer(ActivityList);
