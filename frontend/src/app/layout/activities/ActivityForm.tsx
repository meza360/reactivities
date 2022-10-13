import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, FormGroup, Header, Icon, Segment } from 'semantic-ui-react';
import ComponentLoader from '../../components/ComponentLoader';
import { useStore } from '../../stores/store';
import { historyObject } from '../../../index';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../components/MyTextInput';
import MyTextArea from '../../components/MyTextArea';
import MySelectInput from '../../components/MySelectInput';
import { categoryOptions } from '../../common/categoryOptions';
import MyDateInput from '../../components/MyDateInput';
import { Activity } from '../../models/Activity';

function ActivityForm() {
	const { activityStore } = useStore();
	const { createActivity, updateActivity, loadActivity, loadingInitial } = activityStore;
	const { id } = useParams<{ id: string }>();
	const [ activity, setActivity ] = useState<Activity>({
		id: '',
		title: '',
		category: '',
		description: '',
		date: new Date(),
		city: '',
		venue: ''
	});

	useEffect(
		() => {
			if (id) loadActivity(id).then((activity) => setActivity(activity));
		},
		[ id, loadActivity ]
	);

	const validationSchema = Yup.object({
		title: Yup.string().required('The activity title is required'),
		description: Yup.string().required('The activity description is required'),
		date: Yup.string().required('The activity date is required'),
		city: Yup.string().required('The activity city is required'),
		venue: Yup.string().required('The activity venue is required'),
		category: Yup.string().required('The activity category is required')
	});

	function handleFormSubmit(activity: Activity) {
		try {
			if (activity.id === '') {
				createActivity(activity).then(() => {
					historyObject.push(`/activities`);
				});
			}
			if (activity.id !== '') {
				console.log('from else' + activity);
				updateActivity(activity).then(() => {
					historyObject.push(`/activities/${activity.id}`);
				});
			}
		} catch (error) {
			console.log(error);
			historyObject.push('/client-error');
		}

		/* activity.id ? updateActivity(activity) : createActivity(activity); */
	}

	if (loadingInitial) return <ComponentLoader content={'Loading activity...'} />;

	return (
		<Segment clearing>
			<Header content="Activity Details" />
			<Formik
				enableReinitialize
				initialValues={activity}
				onSubmit={(values) => handleFormSubmit(values)}
				validationSchema={validationSchema}
			>
				{({ handleSubmit, isSubmitting, isValid, dirty }) => {
					return (
						<Form className="ui form">
							<MyTextInput name="title" placeholder="Activity title" />
							<MyTextArea rows={5} name="description" placeholder="Activity description" />
							{
								<MySelectInput
									name="category"
									placeholder="Activity category"
									options={categoryOptions}
								/>
							}
							<Header content="Location Details" />
							<MyDateInput
								name="date"
								placeholderText="Activity date"
								showTimeSelect
								timeCaption="Time"
								dateFormat="MMMM d, yyyy h:mm aa"
							/>
							<MyTextInput name="city" placeholder="Activity city" />
							<MyTextInput name="venue" placeholder="Activity venue" />
							<FormGroup>
								<Button as={Link} to={`/activities/${activity.id}`} negative floated="left">
									<Icon name="cancel" />Cancel
								</Button>
								<Button
									disabled={isSubmitting || !isValid || !dirty}
									positive
									floated="right"
									type="submit"
								>
									<Icon name="check circle" />Submit
								</Button>
							</FormGroup>
						</Form>
					);
				}}
			</Formik>
		</Segment>
	);
}
export default observer(ActivityForm);
