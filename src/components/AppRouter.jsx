import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Posts from '../pages/Posts'
import Error from '../pages/Error'
import PostIdPage from '../pages/PostIdPage'
import { privateRoutes, publicRoutes } from '../router/Routes'

const AppRouter = () => {
    const isAuth = false;
    return (
        isAuth
            ?
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
            :
            <Routes>
                {
                    privateRoutes.map(route =>
                        <Route
                            path={route.path}
                            Component={route.component}
                        />
                    )
                }
                <Route path="/" element={<Navigate to="/posts" />} />
                <Route path="/*" element={<Navigate to="/error" />} />
            </Routes>
    )
}

export default AppRouter