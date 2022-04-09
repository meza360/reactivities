import React, { Fragment } from 'react';
import { Button, ButtonGroup, Container, Image, Nav, Navbar, NavbarBrand, NavLink } from 'react-bootstrap';

interface Props {
	openForm: () => void;
}

export default function NavigationBar({ openForm }: Props) {
	return (
		<Container fluid className="navigationBar">
			<Navbar bg="dark" expand="lg" variant="dark">
				<Container>
					<Image thumbnail src="/assets/images/toast.jpg" />
					<NavbarBrand>Activities</NavbarBrand>
					<Button variant="outline-light" size="lg" onClick={openForm}>
						Create activity
					</Button>
				</Container>
			</Navbar>
		</Container>
	);
}
