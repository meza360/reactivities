import ReactDOM from 'react-dom/client';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';
import { store, StoreContext } from './app/stores/store';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import React from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import { createBrowserHistory } from 'history';

export const historyObject = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
root.render(
	/* <React.StrictMode> */
	<StoreContext.Provider value={store}>
		<HistoryRouter history={historyObject}>
			<App />
		</HistoryRouter>
	</StoreContext.Provider>
	/* </React.StrictMode> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
