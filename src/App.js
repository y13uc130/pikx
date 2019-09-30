import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import configureStore from './store/configureStore';
// Import your global styles here
import './styles.scss';
import './theme/style.scss';
import { asyncHome } from './pages';
import Cart from './pages/Cart';
import BookingStatus from './pages/BookingStatus/BookingStatus';
import { NotFound } from './pages/NotFound';
import routePath from './routePath';
import NetworkDetector from './Hoc/NetworkDetector';

const history = createBrowserHistory();
const initialState = window.__INITIAL_STATE__;
const store = configureStore(history, initialState);

class App extends Component {
  render() {
		return (
			<div className="App">
				<Provider store={store}>
        <ConnectedRouter history={history}>
          <BrowserRouter>
            <Switch>
              <Route exact path={routePath.bookingStatusPath} component={BookingStatus} />
              <Route exact path={routePath.errorPath} component={NotFound} />
              <Route exact path={routePath.cartPath} component={Cart} />
              <Route exact path={routePath.homePath} component={asyncHome} />
              <Redirect from='*' to={routePath.homePath} />
            </Switch>
          </BrowserRouter>
        </ConnectedRouter>
      </Provider>
			</div>
		);
	}
}
export default NetworkDetector(App);
