import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/app';
import reducers from './reducers';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Signin from './components/auth/signin';

var createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<Route path="signin" component={Signin} />
			</Route>
		</Router>
	</Provider>
	, document.querySelector('.container'));