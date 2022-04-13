import React from 'react';
import { Spinner, Modal, Container, Image, Card, Row, Figure } from 'react-bootstrap';

interface Props {
	inverted: boolean;
	content: string;
}

function Loader({ inverted = true, content = 'Loading...' }) {
	return (
		<Container fluid className="d-flex flex-column align-items-center loader-container">
			<Row className="d-flex flex-row justify-content-center">
				<h1>
					{' '}
					Loading content...<Spinner animation="border" variant="primary" />
				</h1>
			</Row>
			<Row>
				<Figure>
					<Figure.Image src="/assets/images/activities/Culture.jpg" />
					<Figure.Caption>Museum de levrou, Paris</Figure.Caption>
				</Figure>
			</Row>
		</Container>
	);
}

export default Loader;
