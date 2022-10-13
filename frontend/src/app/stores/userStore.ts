import { makeAutoObservable, runInAction } from "mobx";
import { historyObject } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
            })
            historyObject.push('/activities');
            store.modalStore.closeModal();
        } catch (e) {
            throw e;
        }
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
            })
            historyObject.push('/activities');
            store.modalStore.closeModal();
        } catch (e) {
            throw e;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        runInAction(() => this.user = null)
        historyObject.push('/');
    }

    setUser = (user: User) => {
        this.user = user;
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.setUser(user));
        } catch (e) {
            console.log(e);
        }
    }

}

