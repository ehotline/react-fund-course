import React, { useState, useMemo, useEffect } from 'react';
import '../src/styles/App.css'
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';
import axios from 'axios';
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';

function App() {
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({ sort: '', query: '' })
	const [modal, setModal] = useState(false)
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
	const [isPostsLoading, setIsPostsLoading] = useState(false)

	useEffect(() => {
		fetchPosts()
	}, [])

	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
	}

	async function fetchPosts() {
		setIsPostsLoading(true)
		setTimeout(async () => {

			const posts = await PostService.getAll()
			setPosts(posts)
			setIsPostsLoading(false)
		}, 1000)
	}

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	return (
		<div className="App">
			<MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
				Создать пост
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			<hr style={{ margin: '15px 0' }} />
			<PostFilter
				filter={filter}
				setFilter={setFilter}
			/>
			{isPostsLoading
				? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div>
				: <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов" />
			}
		</div>
	);
}

export default App;
