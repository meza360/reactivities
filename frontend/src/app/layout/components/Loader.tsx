import React, { Fragment } from 'react';
import { Image } from 'semantic-ui-react';

interface Props {
	inverted: boolean;
	content: string;
}

function Loader({ inverted = true, content = 'Loading...' }) {
	return (
		<Fragment>
			<Image src="/assets/images/activities/Culture.jpg" alt="Museum de levrou, Paris" />
		</Fragment>
	);
}

export default Loader;
