import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import NavBar from './navbar/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import ActivityDashboard from '../../features/activities/activityDashboard/ActivityDashboard';
import agent from '../api/agent';
import Loader from './Loader';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import { Route } from 'react-router-dom';
import ActivityForm from '../../features/activities/activityForm/ActivityForm';

function App() {
	return (
		<Fragment>
			<NavBar />
			<Container fluid className="mainAppContainer">
				<Route exact path="/" component={ActivityDashboard} />
				<Route path="/createActivity" component={ActivityForm} />
			</Container>
		</Fragment>
	);
}

export default observer(App);
