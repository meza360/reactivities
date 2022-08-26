import { Dimmer, Loader } from 'semantic-ui-react';

interface props {
	inverted?: boolean;
	content: string;
}

function ComponentLoader({ inverted = true, content = 'Loading...' }: props) {
	return (
		<Dimmer active={true} inverted={inverted}>
			<Loader content={content} />
		</Dimmer>
	);
}
export default ComponentLoader;
