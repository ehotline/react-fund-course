import { BrowserRouter, Link, Navigate, Route, Routes, redirect } from 'react-router-dom';
import '../src/styles/App.css';
import Posts from './pages/Posts';
import About from './pages/About';
import Navbar from './components/UI/navbar/Navbar';
import Error from './pages/Error';

function App() {
	return (
		<BrowserRouter>
			<Navbar/>
			<Routes>
				<Route path="/about" Component={About}/>
				<Route path="/posts" Component={Posts}/>
				<Route path="/error" Component={Error}/>
				<Route path='/*' element={<Navigate to="/error" />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;
