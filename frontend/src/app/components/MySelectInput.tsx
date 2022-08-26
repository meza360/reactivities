import { ErrorMessage, useField } from 'formik';
import { Form, Label, Select } from 'semantic-ui-react';

interface Props {
	placeholder: string;
	name: string;
	options: any;
	label?: string;
}

function MySelectInput(props: Props) {
	const [ field, meta, helpers ] = useField(props.name);

	return (
		<Form.Group>
			<Form.Field error={meta.touched && !!meta.error}>
				<Select
					clearable
					options={props.options}
					value={field.value || null}
					onChange={(evt, data) => helpers.setValue(data.value)}
					onBlur={() => helpers.setTouched(true)}
					placeholder={props.placeholder}
				/>
				{meta.touched && meta.error ? (
					<ErrorMessage name="title" render={(error) => <Label basic color="red" content={error} />} />
				) : null}
			</Form.Field>
		</Form.Group>
	);
}
export default MySelectInput;
