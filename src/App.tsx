
	import React from 'react';
	import {
		BrowserRouter as Router
	} from 'react-router-dom';
	
	import ResetCss from './styles/reset-css';
	import GlobalStyles from './styles/global';
	import Routes from './pages/routes';
	import { SocketProvider } from './context/socket-context';
	import { UsersProvider } from './context/user-context';
	
	function App() {
		return (
			<SocketProvider>
				<UsersProvider>
					<Router>
						<ResetCss />
						<GlobalStyles />
						<Routes />
					</Router>
				</UsersProvider>
			</SocketProvider>
		);
	}
	
	export default App;
	