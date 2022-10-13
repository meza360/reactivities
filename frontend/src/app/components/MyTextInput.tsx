import { ErrorMessage, Field, useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';

interface Props {
	placeholder: string;
	name: string;
	label?: string;
	type?: string;
}

function MyTextInput(props: Props) {
	const [field, meta] = useField(props.name);

	return (
		<Form.Group>
			<Field error={meta.touched && !!meta.error ? 'error' : undefined} {...field} {...props}/>
				{meta.touched && !!meta.error ? (
					<ErrorMessage name="title" render={(error) => <Label basic color="red" content={error} />} />
				) : undefined}
		</Form.Group>
	);
}
export default MyTextInput;
