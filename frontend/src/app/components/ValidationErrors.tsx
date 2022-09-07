import {  Message } from 'semantic-ui-react';

interface Props {
	errorArray: string[] | string | null | any;
}

function ValidationErrors({ errorArray }: Props) {
	return (
		<Message error>
			{errorArray && (
				<Message.List>
					{errorArray.map((e: any, index: any) => <Message.Item key={index}>{e}</Message.Item>)}
				</Message.List>
			)}
		</Message>
	);
}

export default ValidationErrors;
