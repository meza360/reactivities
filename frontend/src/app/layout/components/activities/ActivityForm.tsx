import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, Fragment, useState } from 'react';
import { Button, Form, FormGroup } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';

function ActivityForm() {
	const {activityStore} = useStore();
	const {selectedActivity,closeForm,createActivity,updateActivity}=activityStore;

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
		activity.id ? updateActivity(activity) : createActivity(activity);
	}

	function handleInputChange(event: ChangeEvent<HTMLInputElement>){
		const{name, value}=event.target;
		setActivity({...activity, [name]:value})
	}

	return (
		<Fragment>
			<div >
			<Form onSubmit={handleSubmit} autoComplete='off'>
				<FormGroup className="mb-2">
					<Form.Field type="text" placeholder="Title" value={activity.title} name='title' onChange={handleInputChange}/>
				</FormGroup>
				<FormGroup className="mb-2">
					<Form.Field type='text' placeholder="Descripcion" value={activity.description} name='description' onChange={handleInputChange} />
				</FormGroup>
				<FormGroup className="mb-2">
					<Form.Field type="text" placeholder="Category"value={activity.category} name='category' onChange={handleInputChange} />
				</FormGroup>
				<FormGroup className="mb-2">
					<Form.Field type="date" placeholder="Date" value={activity.date} name='date' onChange={handleInputChange}/>
				</FormGroup>
				<FormGroup className="mb-2">
					<Form.Field type="text" placeholder="City" value={activity.city} name='city' onChange={handleInputChange}/>
				</FormGroup>
				<FormGroup className="mb-2">
					<Form.Field type="text" placeholder="Venue"value={activity.venue} name='venue' onChange={handleInputChange} />
				</FormGroup>
				<FormGroup className="mb-2">
					<div>
						<div>
						<Button onClick={handleSubmit}>Submit</Button>
						<Button onClick={closeForm}>Cancel</Button>
						</div>
						
					</div>
				</FormGroup>
			</Form>
			</div>
		</Fragment>
	);
}
export default observer(ActivityForm);
