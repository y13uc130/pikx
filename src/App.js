import React, { Component } from 'react';
import { hydrate } from 'react-dom';
import { createBrowserHistory } from 'history';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import { Router, Route, Switch } from 'react-router';
import configureStore from './store/configureStore';
import routes from './routes';
// Import your global styles here
import './styles.scss';
import './theme/style.scss';
import Home from './pages/Home';
import { asyncHome } from './pages';
import Cart from './pages/Cart';
const history = createBrowserHistory();
// Get the initial state from server-side rendering
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
            <Route exact path="/" component={asyncHome} />
            <Route exact path="/checkout/cart" component={Cart} />
          </Switch>
          </BrowserRouter>
        </ConnectedRouter>
      </Provider>
			</div>
		);
	}
}
export default App;
