import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Activity, ActivityDto } from '../models/Activity';
import { historyObject as history } from '../../index';

//remove before pushing to production branch
const sleep = (delay: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
};

axios.defaults.baseURL = 'https://localhost:5001/api';

//fake delay

axios.interceptors.response.use(
	async (response) => {
		try {
			await sleep(1000);
			return response;
		} catch (error) {
			console.log(error);
			return await Promise.reject(error);
		}
		/* try {
		await sleep(1000);
		return response;
	} catch (error) {
		console.log(error);
		return await Promise.reject(error);
	} */
	},
	(e: AxiosError) => {
		const { data, status } = e.response!;
		switch (status) {
			case 400:
				if (data['errors']) {
					const errorModal = [];
					for (const item in data['errors']) {
						errorModal.push(data['errors'][item]);
					}
					throw errorModal.flat();
				} else {
					toast.warning(data['title']);
					history.push('/notFound');
				}
				break;
			case 401:
				toast.error('unauthorised');
				break;
			case 404:
				toast.info('not-found');
				history.push('/notFound');
				break;
			case 500:
				toast.error('server-error');
				break;
		}
		return Promise.reject(e);
	}
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
	del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
};

const Activities = {
	list: () => requests.get<Activity[]>('/activities'),
	details: (id: string) => requests.get<Activity>(`/activities/${id}`),
	create: (activity: Activity) => requests.post<void>('/activities/', activity),
	update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
	delete: (id: string) => requests.del<void>(`/activities/${id}`)
};

const agent = {
	Activities
};

export default agent;
