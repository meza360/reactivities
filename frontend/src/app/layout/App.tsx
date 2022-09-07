import './App.css';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import NavigationBar from '../components/NavigationBar';
import { Route, Routes } from 'react-router-dom';
import ActivityList from './activities/ActivityList';
import ActivityForm from './activities/ActivityForm';
import ActivityDetails from './activities/ActivityDetails';
import TestErrors from '../errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../components/NotFound';
import LoginForm from '../users/LoginForm';
import ServerError from '../errors/ServerError';
import HomePage from './activities/HomePage';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import ComponentLoader from '../components/ComponentLoader';
import ModalContainer from '../common/modals/ModalContainer';

function App() {
	const { commonStore, userStore } = useStore();
	const { getUser } = userStore;
	const { token, setAppLoaded, appLoaded } = commonStore;

	useEffect(
		() => {
			if (token) {
				getUser()
					.finally(() => {
						setAppLoaded();
					});
			} else {
				setAppLoaded();
			}
		},
		[commonStore, userStore]
	);

	if (!appLoaded) return <ComponentLoader content='Loading app..' />;

	return (
		<div className="page-body">
			<ToastContainer position="bottom-right" />
			<ModalContainer />
			<header>
				<NavigationBar />
			</header>
			<main>
				<Container className="body-container">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/activities" element={<ActivityList />} />
						<Route path="/activities/:id" element={<ActivityDetails />} />
						<Route path={'/manage/createActivity'} element={<ActivityForm />} />
						<Route path={'/manage/editActivity/:id'} element={<ActivityForm />} />
						<Route path="/errors" element={<TestErrors />} />
						<Route path="/server-error" element={<ServerError />} />
						{/* <Route path="/login" element={<LoginForm />} /> */}
						<Route path="/*" element={<NotFound />} />
					</Routes>
				</Container>
			</main>
			<footer />
		</div>
	);
}

export default observer(App);
