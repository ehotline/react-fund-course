import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader'
import MyButton from '../components/UI/button/MyButton'

const PostIdPage = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data)
    })
    useEffect(() => {
        fetchPostById(id)
        fetchComments(id)
    }, [])

    const click = () => {
        console.log(post);
        console.log(comments);
    }

    return (
        <div>
            <h1>Вы открыли пост {id}</h1>
            {isLoading || post == null || post == {}
                ? <Loader />
                : <div>{post.id}. {post.title}</div>
            }
            <h1>Комментарии</h1>
            {isComLoading || comments == null
                ? <Loader />
                : <div>
                    {comments.map((comm) => 
                        <div>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>}
                <MyButton onClick={click}>Кликни</MyButton>
        </div>
    )
}

export default PostIdPage