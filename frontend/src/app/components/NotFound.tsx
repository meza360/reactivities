import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, Segment, Button } from 'semantic-ui-react';

function NotFound() {
	return (
		<Segment placeholder>
			<Header icon>
				<Icon name="search" />
				Ops, we could find that.
			</Header>
			<Segment.Inline>
				<Button as={Link} to="/activities" primary>
					Return to activities home page
				</Button>
			</Segment.Inline>
		</Segment>
	);
}
export default NotFound;
