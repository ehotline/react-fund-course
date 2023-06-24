import React, { useRef, useState } from 'react';
import Counter from './components/Counter';
import ClassCounter from './components/ClassCounter';
import '../src/styles/App.css'
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';

function App() {
	const [posts, setPosts] = useState([
		{ id: 1, title: 'Javascript', body: 'Description' },
		{ id: 2, title: 'Javascript 2', body: 'Description' },
		{ id: 3, title: 'Javascript 3', body: 'Description' }
	])

	const [title, setTitle] = useState('')
	const bodyInputRef = useRef()
	const addNewPost = (e) => {
		e.preventDefault()
		console.log(title)
		console.log(bodyInputRef.current.value)
	}

	return (
		<div className="App">
			<form>
				{/*Управляемый компонент*/}
				<MyInput
					value={title}
					onChange={e => setTitle(e.target.value)}
					type="text"
					placeholder='Название поста'
				/>
				{/*Неуправляемый компонент*/}
				<MyInput 
					ref={bodyInputRef}
					type="text" 
					placeholder='Описание поста' 
				/>
				<MyButton onClick={addNewPost}>Создать пост</MyButton>
			</form>
			<PostList posts={posts} title="Список постов 1" />
		</div>
	);
}

export default App;
