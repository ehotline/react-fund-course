import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Posts from '../pages/Posts'
import Error from '../pages/Error'
import PostIdPage from '../pages/PostIdPage'

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/about" Component={About} />
            <Route path="/posts" Component={Posts} />
            <Route exact path="/posts/:id" Component={PostIdPage}/>
            <Route path="/error" Component={Error} />
            <Route path='/*' element={<Navigate to="/error" />} />
        </Routes>
    )
}

export default AppRouter