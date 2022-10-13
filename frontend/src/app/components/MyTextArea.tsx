import { ErrorMessage, Field, useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';

interface Props {
	placeholder: string;
	name: string;
	rows: number;
	label?: string;
}

function MyTextArea(props: Props) {
	const [field, meta] = useField(props.name);

	return (
		<Form.Group>
			<Field as="textarea" error={meta.touched && !!meta.error ? 'error' : undefined} {...field} {...props} />
			{meta.touched && meta.error ? (
				<ErrorMessage name="title" render={(error) => <Label basic color="red" content={error} />} />
			) : null}
		</Form.Group>
	);
}
export default MyTextArea;
