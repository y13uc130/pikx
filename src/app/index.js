import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { hot } from 'react-hot-loader';

// Import your global styles here
import './styles.scss';
import '../theme/style.scss';
import 'react-input-range/lib/css/index.css';

class App extends Component {
	state = {
	};

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	componentDidCatch(error, info) {
    // Display fallback UI
		console.error(`Error:${error}\n Info:${JSON.stringify(info)}`);
	}

	render() {
		const { route } = this.props;
		return (
			<div className="App">
				{/* Child routes won't render without this */}
				<div className="">
          {renderRoutes(route.routes)}
				</div>
			</div>
		);
	}
}
export default hot(module)(App);
