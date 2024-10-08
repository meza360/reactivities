import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Activity, ActivityDto } from '../models/Activity';
import { format } from 'date-fns';

export default class ActivityStore {
	activities: Activity[] = [];
	activityRegistry = new Map<string, Activity>();
	selectedActivity: Activity | undefined = undefined;
	editMode = false;
	loading = false;
	loadingInitial: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	loadActivities = async () => {
		//el codigo asincrono se ejecuta fuera del bloque trycatch
		this.setLoadingInitial(true);
		try {
			runInAction(async () => {
				//codigo asincrono sera dentro del bloqye trycatch
				const activities = await agent.Activities.list();
				activities.forEach((activity) => {
					//console.log(activity);
					this.activityRegistry.set(activity.id, activity);
					this.setActivity(activity);
				});
			});
			this.setLoadingInitial(false);
		} catch (error) {
			console.log(error);
			this.setLoadingInitial(false);
		}
	};
	get activitiesByDate() {
		return Array.from(this.activityRegistry.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
	}

	get groupedActivities() {
		return Object.entries(
			this.activitiesByDate.reduce(
				(activities, activity) => {
					let date = format(activity.date, 'dd MMM yyyy');
					activities[date] = activities[date] ? [ ...activities[date], activity ] : [ activity ];
					return activities;
				},
				{} as { [key: string]: Activity[] }
			)
		);
	}

	private getActivity = (id) => {
		return this.activityRegistry.get(id);
	};

	private setActivity = (activity: Activity | null) => {
		this.selectedActivity = activity;
		activity.date = new Date(activity.date);
		try {
			this.activityRegistry.set(activity.id, activity);
		} catch (error) {
			console.log(error);
		}
	};

	loadActivity = async (id: string) => {
		let activity = this.getActivity(id);
		if (activity) {
			runInAction(() => {
				this.setActivity(activity);
				return activity;
			});
		} else {
			this.loadingInitial = true;
			try {
				activity = await agent.Activities.details(id);
				this.setActivity(activity);
				this.setLoadingInitial(false);
				return activity;
			} catch (error) {
				console.log(error);
				this.setLoadingInitial(false);
			}
		}
	};

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	};

	createActivity = async (activity: Activity) => {
		this.loading = true;
		let act: ActivityDto = {
			title: activity.title,
			description: activity.description,
			category: activity.category,
			date: activity.date,
			city: activity.city,
			venue: activity.venue
		};
		try {
			await agent.Activities.create(act);
			runInAction(() => {
				this.activityRegistry.set(activity.id, activity);
				this.activities.push(activity);
				console.log(activity);
				this.selectedActivity = activity;
				this.editMode = false;
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	updateActivity = async (activity: Activity) => {
		this.loading = true;
		try {
			await agent.Activities.update(activity);
			runInAction(() => {
				this.activityRegistry.set(activity.id, activity);
				/* this.activities = [ ...this.activities.filter((a) => a.id !== activity.id), activity ]; */
				this.selectedActivity = activity;
				this.editMode = false;
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	deleteActivity = async (id: string) => {
		this.loading = true;
		this.loadingInitial = true;
		try {
			await agent.Activities.delete(id);
			runInAction(() => {
				this.activityRegistry.delete(id);
				/* this.activities = [ ...this.activities.filter((a) => a.id !== id) ]; */
				if (this.selectedActivity.id === id) {
					this.setActivity(null);
				}
				this.loading = false;
				this.loadingInitial = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};
}
