import { NavLink } from 'react-router-dom';
import { Button, Container, Image, Menu } from 'semantic-ui-react';

export default function NavigationBar() {
	return (
		<Menu fixed="top" inverted>
			<Container>
				<Menu.Item header>
					<Image src="/assets/images/icons/logo.png" alt="activities-icon" size="tiny" />
				</Menu.Item>
				<Menu.Item as={NavLink} to="/activities">
					Activities
				</Menu.Item>
				<Menu.Item>
					<Button as={NavLink} to="/manage/createActivity" positive>
						Create activity
					</Button>
				</Menu.Item>
				<Menu.Item>
					<Button as={NavLink} to="/errors" negative>
						Error page
					</Button>
				</Menu.Item>
			</Container>
		</Menu>
	);
}
