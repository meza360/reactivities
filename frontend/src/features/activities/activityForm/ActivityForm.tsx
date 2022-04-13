import React, { ChangeEvent, useState } from 'react';

import { Form, FormControl, FormGroup, Container, Button, Row, Stack,Spinner } from 'react-bootstrap';
import { Activity } from '../../../app/models/Activity';

interface Props {
	activity: Activity | undefined;
	closeForm: () => void;

	//this below is temporal
	createOrEdit: (activity: Activity) => void;

}

function ActivityForm({ activity: selectedActivity, closeForm,createOrEdit }: Props) {

	const initialState = selectedActivity ?? {
		id: '',
		title: '',
		category: '',
		description: '',
		date: '',
		city: '',
		venue: ''
	}

	const [activity, setActivity] = useState(initialState);

	function handleSubmit(){
		createOrEdit(activity);
	}

	function handleInputChange(event: ChangeEvent<HTMLInputElement>){
		const{name, value}=event.target;
		setActivity({...activity, [name]:value})
	}

	return (
		<Container className="mb-5">
			<Stack gap={2}>
			<Form onSubmit={handleSubmit} autoComplete='off'>
				<FormGroup className="mb-2">
					<FormControl type="text" placeholder="Title" value={activity.title} name='title' onChange={handleInputChange}/>
				</FormGroup>
				<FormGroup className="mb-2">
					<FormControl type='text' placeholder="Descripcion" value={activity.description} name='description' onChange={handleInputChange} />
				</FormGroup>
				<FormGroup className="mb-2">
					<FormControl type="text" placeholder="Category"value={activity.category} name='category' onChange={handleInputChange} />
				</FormGroup>
				<FormGroup className="mb-2">
					<FormControl type="date" placeholder="Date" value={activity.date} name='date' onChange={handleInputChange}/>
				</FormGroup>
				<FormGroup className="mb-2">
					<FormControl type="text" placeholder="City" value={activity.city} name='city' onChange={handleInputChange}/>
				</FormGroup>
				<FormGroup className="mb-2">
					<FormControl type="text" placeholder="Venue"value={activity.venue} name='venue' onChange={handleInputChange} />
				</FormGroup>
				<FormGroup className="mb-2">
					<Row>
						<Stack gap={4}>
						<Button type='submit'>Submit</Button>
						<Button onClick={closeForm}>Cancel</Button>
						</Stack>
						
					</Row>
				</FormGroup>
			</Form>
			</Stack>
		</Container>
	);
}
export default ActivityForm;
