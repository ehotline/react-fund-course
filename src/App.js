import { BrowserRouter, Link, Navigate, Route, Routes, redirect } from 'react-router-dom';
import '../src/styles/App.css';
import Posts from './pages/Posts';
import About from './pages/About';
import Navbar from './components/UI/navbar/Navbar';
import Error from './pages/Error';
import AppRouter from './components/AppRouter';

function App() {
	return (
		<BrowserRouter>
			<Navbar/>
			<AppRouter/>
		</BrowserRouter>
	)
}

export default App;
