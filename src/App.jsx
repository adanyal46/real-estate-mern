import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/Signin'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import AppHeader from './components/AppHeader'
import PrivateRoute from './components/PrivateRoute'

function App() {
	return (
		<BrowserRouter>
			<AppHeader />
			<Routes>
				<Route path="/" Component={Home} />
				<Route path="/sign-in" Component={SignIn} />
				<Route path="/sign-up" Component={SignUp} />
				<Route path="/about" Component={About} />
				<Route element={<PrivateRoute />}>
					<Route path="/profile" Component={Profile} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
