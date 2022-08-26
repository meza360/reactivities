import './App.css';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import NavigationBar from '../components/NavigationBar';
import ActivityDashboard from './activities/ActivityDashboard';
import { Route, Routes } from 'react-router-dom';
import ActivityList from './activities/ActivityList';
import ActivityForm from './activities/ActivityForm';
import ActivityDetails from './activities/ActivityDetails';
import TestErrors from '../errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../components/NotFound';

function App() {
	return (
		<div className="page-body">
			<ToastContainer position="bottom-right" />
			<header>
				<NavigationBar />
			</header>
			<main>
				<Container className="body-container">
					<Routes>
						<Route path="/" element={<ActivityDashboard />} />
						<Route path="/activities" element={<ActivityList />} />
						<Route path="/activities/:id" element={<ActivityDetails />} />
						<Route path={'/manage/createActivity'} element={<ActivityForm />} />
						<Route path={'/manage/editActivity/:id'} element={<ActivityForm />} />
						<Route path="/errors" element={<TestErrors />} />
						<Route path="/*" element={<NotFound />} />
					</Routes>
				</Container>
			</main>
			<footer />
		</div>
	);
}

export default observer(App);
