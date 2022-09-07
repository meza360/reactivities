import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';
import { useStore } from '../../stores/store';
import LoginForm from '../../users/LoginForm';
import RegisterForm from '../../users/RegisterForm';

function HomePage() {
	const { userStore, modalStore } = useStore();
	const { isLoggedIn } = userStore;
	return (
		<Segment inverted textAlign='center' vertical className='masthead'>
			<Container text>
				<Header as='h1' inverted>
					<Image size='massive' src='/assets/images/icons/logo.png' alt='logo' style={{ marginBottom: 12 }} />
					Reactivities
				</Header>
				{
					isLoggedIn ?
						(
							<>
								<Header as='h2' inverted>
									Welcome to Reactivities
								</Header>
								<Button as={Link} to='/activities'>Go to activities!</Button>
							</>
						) :
						(
							<>
								<Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>Login</Button>
								<Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>Register</Button>
							</>
						)
				}
			</Container>
		</Segment>
	);
}

export default observer(HomePage);
