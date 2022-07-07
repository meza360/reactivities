import { Button, Container, Image, Menu } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

export default function NavigationBar() {
	const { activityStore } = useStore();
	return (
		<Menu fixed="top" inverted>
			<Container>
				<Menu.Item header>
					<Image src="/assets/svg/boy.svg" alt="activities-icon" size="tiny" />
				</Menu.Item>
				<Menu.Item>Activities</Menu.Item>
				<Menu.Item>
					<Button positive onClick={() => activityStore.openForm()}>
						Create activity
					</Button>
				</Menu.Item>
			</Container>
		</Menu>
	);
}
