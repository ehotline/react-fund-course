import React, { useEffect, useRef, useState } from 'react';
import '../styles/App.css';
import PostService from '../API/PostService';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import Loader from '../components/UI/Loader/Loader';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import Pagination from '../components/UI/pagination/Pagination';
import { getPageCount } from '../components/utils/pages';
import { useFetching } from '../hooks/useFetching';
import { usePosts } from '../hooks/usePosts';

const Posts = () => {
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({ sort: '', query: '' })
	const [modal, setModal] = useState(false)
	const [totalPages, setTotalPages] = useState(0)
	const [limit, setLimit] = useState(10)
	const [page, setPage] = useState(1)
	const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
		const respone = await PostService.getAll(limit, page)
		setPosts([...posts, ...respone.data])
		const totalCount = respone.headers['x-total-count']
		setTotalPages(getPageCount(totalCount, limit))
	})
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
	const lastElement = useRef()
	const observer = useRef()

	useEffect(() => {
		if(isPostsLoading) return;
		if(observer.current) {
			observer.current.disconnect();
		}
		var callback = function(entries, observer) {
			if(entries[0].isIntersecting && page < totalPages) {
				setPage(page + 1)
			}
		}
		observer.current = new IntersectionObserver(callback)
		observer.current.observe(lastElement.current)
	}, [isPostsLoading])

	useEffect(() => {
		fetchPosts(limit, page)
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
			<PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов" />
			<div ref={lastElement} style={{ height: 20, background: 'red' }} />
			{isPostsLoading &&
				<div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div>
			}
			<Pagination
				totalPages={totalPages}
				page={page}
				changePage={changePage}
			/>
		</div>
	);
}

export default Posts;
