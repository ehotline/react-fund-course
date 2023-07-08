import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Posts from '../pages/Posts'
import Error from '../pages/Error'
import PostIdPage from '../pages/PostIdPage'
import { privateRoutes, publicRoutes } from '../router/Routes'
import { AuthContext } from '../context'
import Loader from './UI/Loader/Loader'

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext)

    if(isLoading) {
        return <Loader/>
    }
    return (
        isAuth
            ?
            <Routes>
                {
                    privateRoutes.map(route =>
                        <Route
                            path={route.path}
                            Component={route.component}
                        />
                    )
                }
                <Route path="/*" element={<Navigate to="/posts" />} />
            </Routes>
            :
            <Routes>
                {
                    publicRoutes.map(route =>
                        <Route
                            path={route.path}
                            Component={route.component}
                        />
                    )
                }
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/*" element={<Navigate to="/login" />} />
            </Routes>
    )
}

export default AppRouter