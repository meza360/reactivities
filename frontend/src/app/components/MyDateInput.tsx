import { ErrorMessage, useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

function MyDateInput(props: ReactDatePickerProps) {
	const [ field, meta, helpers ] = useField(props.name);

	return (
		<Form.Group>
			<Form.Field error={meta.touched && !!meta.error}>
				<DatePicker
					{...field}
					{...props}
					selected={(field.value && new Date(field.value)) || null}
					onChange={(value) => helpers.setValue(value)}
				/>
				{meta.touched && meta.error ? (
					<ErrorMessage name="title" render={(error) => <Label basic color="red" content={error} />} />
				) : null}
			</Form.Field>
		</Form.Group>
	);
}
export default MyDateInput;
