import { BrowserRouter, Link, Navigate, Route, Routes, redirect } from 'react-router-dom';
import '../src/styles/App.css';
import Posts from './pages/Posts';
import About from './pages/About';
import Navbar from './components/UI/navbar/Navbar';
import Error from './pages/Error';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';
import { useEffect, useState } from 'react';

function App() {
	const [isAuth, setIsAuth] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if(localStorage.getItem('auth')) {
			setIsAuth(true)
		}
		setIsLoading(false)
	}, [])

	return (
		<AuthContext.Provider value={{
			isAuth,
			setIsAuth,
			isLoading
		}}>
			<BrowserRouter>
				<Navbar />
				<AppRouter />
			</BrowserRouter>
		</AuthContext.Provider>
	)
}

export default App;
