import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Grid, Icon, Image } from 'semantic-ui-react';
import ComponentLoader from '../../components/ComponentLoader';
import { useStore } from '../../stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';
import './ActivityDetails.css';
import { format } from 'date-fns';

function ActivityDetails() {
	const { activityStore } = useStore();
	const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
	const { id } = useParams<{ id: string }>();

	useEffect(
		() => {
			if (id) loadActivity(id);
		},
		[ id, loadActivity ]
	);

	if (loadingInitial || !activity) return <ComponentLoader content={'Loading Activity...'} />;

	return (
		<Grid>
			<Grid.Column width={10}>
				<Card style={{ width: '100%' }}>
					<Image src={`/assets/images/activities/${activity.category}.jpg`} />
					<Card.Header as={'h1'}>{activity.title}</Card.Header>
					<p>
						{format(new Date(activity.date), 'dd MMM yyy h:mm aa')} <br />
						Hosted by: Me
					</p>

					<Card.Content>
						<Button floated="right" secondary as={Link} to={`/manage/editActivity/${activity.id}`}>
							<Icon name="edit" />
							Manage Event
						</Button>
						<Button floated="left" primary as={Link} to="/activities">
							<Icon name="envelope" />
							Join activity
						</Button>
						<Button floated="left" negative as={Link} to="/activities">
							<Icon name="close" />
							Cancel attendance
						</Button>
					</Card.Content>
				</Card>
				<ActivityDetailedInfo />
				<ActivityDetailedChat />
			</Grid.Column>
			<Grid.Column width={6}>
				<ActivityDetailedSidebar />
			</Grid.Column>
		</Grid>
	);
}
export default observer(ActivityDetails);
