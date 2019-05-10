import React from 'react';
import './App.css';
import { Provider } from "react-redux"

import ClientsList from './components/ClientsList';
import { ConnectedRouter } from 'connected-react-router'

import { Store } from 'redux';
import { Route, Switch } from 'react-router-dom'
import { History } from 'history'
import { AppState } from './store';
import Layout from './components/Layout';
import LoginForm from './containers/LoginForm';

interface AppProps {
	store: Store<AppState>,
	history: History
}

const App: React.FC<AppProps> = ({ store, history }) => {
	return (
		<div>
				<Provider store={store}>
					<ConnectedRouter history={history}>
						<Switch>
							<Route exact path="/" component={LoginForm} />
							<Route path="/dashboard" component={() => <Layout> <ClientsList/> </Layout>} />
							<Route component={() => <div>Not Found</div>} />
						</Switch>
					</ConnectedRouter>
				</Provider>
		</div>
	);
}

export default App;
