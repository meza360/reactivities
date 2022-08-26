import {  Message } from 'semantic-ui-react';

interface Props {
	errorArray: string[] | null;
}

function ValidationErrors({ errorArray }: Props) {
	return (
		<Message error>
			{errorArray && (
				<Message.List>
					{errorArray.map((e: any, index) => <Message.Item key={index}>{e}</Message.Item>)}
				</Message.List>
			)}
		</Message>
	);
}

export default ValidationErrors;
