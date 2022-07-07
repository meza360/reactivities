import './App.css';
import NavBar from './components/NavigationBar';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';

function App() {
	return (
		<Container fluid>
			<header>
				<NavBar />
			</header>
			<main />
			<footer />
		</Container>
	);
}

export default observer(App);
