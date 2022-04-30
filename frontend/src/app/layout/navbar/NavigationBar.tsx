import React, { Fragment } from 'react';
import { Button, ButtonGroup, Container, Image, Nav, Navbar, NavbarBrand, NavLink } from 'react-bootstrap';
import { useStore } from '../../stores/store';

export default function NavigationBar() {
	const { activityStore } = useStore();
	return (
		<Container fluid className="navigationBar">
			<Navbar bg="dark" expand="lg" variant="dark">
				<Container>
					<Image rounded src="/assets/svg/boy.svg" height={50} />
					<NavbarBrand>Activities</NavbarBrand>
					<Button variant="outline-light" size="lg" onClick={() => activityStore.openForm()}>
						Create activity
					</Button>
				</Container>
			</Navbar>
		</Container>
	);
}
