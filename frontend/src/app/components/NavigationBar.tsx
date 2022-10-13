import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

function NavigationBar() {
	const { userStore: { user, logout } } = useStore();

	return (
		<Menu fixed="top" inverted>
			<Container>
				<Menu.Item header>
					<Image src="/assets/images/icons/logo.png" alt="activities-icon" size="tiny" as={Link} to='/' />
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
				<Menu.Item position='right'>
					<Image src={user?.image || '/assets/images/icons/user.png'} avatar spaced='right' />
					<Dropdown pointing='top left' text={user?.displayName}>
						<Dropdown.Menu>
							<Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My profile' icon='user' />
							<Dropdown.Item onClick={logout} text='Logout' icon='power' />
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Item>
			</Container>
		</Menu>
	);
}

export default observer(NavigationBar);