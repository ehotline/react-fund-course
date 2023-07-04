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
import { useFetching } from './hooks/useFetching';
import { getPageCount, getPagesArray } from './components/utils/pages';
import { usePagination } from './hooks/usePagination';

function App() {
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({ sort: '', query: '' })
	const [modal, setModal] = useState(false)
	const [totalPages, setTotalPages] = useState(0)
	const [limit, setLimit] = useState(10)
	const [page, setPage] = useState(1)

	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const respone = await PostService.getAll(limit, page)
		setPosts(respone.data)
		const totalCount = respone.headers['x-total-count']
		setTotalPages(getPageCount(totalCount, limit))
	})
	const pagesArray = usePagination(totalPages)
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

	useEffect(() => {
		fetchPosts()
	}, [page])

	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
	}

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	const changePage = (page) => {
		setPage(page)
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
			{postError &&
				<h1>Произошла ошибка ${postError}</h1>
			}
			{isPostsLoading
				? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div>
				: <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов" />
			}
			<div className="page__wrapper">
				{
					pagesArray.map(p =>
						<span 
						onClick={() => changePage(p)}
						key={p} 
						className={page === p ? 'page page__current' : 'page'}
						>
							{p}
						</span>)
				}
			</div>
		</div>
	);
}

export default App;
