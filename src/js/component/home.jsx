import React, { useState, useEffect, useCallback } from "react";
import {
	createTodoList,
	deleteTodoList,
	getTodos,
	updateTodoList
} from "../../services/todos";

const username = `priscila`;
const userKey = `username`;

const Home = () => {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");

	const createList = useCallback(() => {
		const user = localStorage.getItem(userKey);

		if (user) {
			getList();
			return;
		}

		createTodoList(username).then(response => {
			console.log(response);
			localStorage.setItem(userKey, username);
			getList();
		});
	}, []);

	const deleteList = useCallback(() => {
		deleteTodoList(username).then(response => {
			localStorage.setItem(userKey, "");
		});
	}, []);

	const getList = useCallback(() => {
		getTodos(username).then(newList => {
			setTodos(newList);
		});
	}, []);

	const handleOnChangeInput = useCallback(event => {
		setInput(event.target.value);
	}, []);

	const handleOnKeyPressInput = useCallback(
		event => {
			if (event.key === "Enter" && input.trim()) {
				setTodos([...todos, { label: input, done: false }]);
				setInput("");
			}
		},
		[todos, input]
	);

	const updateList = useCallback(
		todos => {
			updateTodoList(username, todos);
		},
		[username]
	);

	useEffect(() => {
		if (!todos.length) {
			return;
		}
		updateList(todos);
	}, [todos]);

	useEffect(() => {
		createList();
	}, [createList]);

	const handleDeleteTodo = indexTodo => {
		return () => {
			setTodos(allTodos => {
				const newTodos = allTodos.filter(
					(_, index) => index !== indexTodo
				);

				if (!newTodos.length) {
					deleteList();
				}

				return newTodos;
			});
		};
	};

	return (
		<div className="container col-10">
			<h1>todos</h1>
			<div className="card">
				<input
					placeholder=""
					onChange={handleOnChangeInput}
					onKeyPress={handleOnKeyPressInput}
					value={input}
					type="text"
				/>
				<ul className="list">
					{todos.map((todo, index) => (
						<li className="item" key={`todo_item_${index}`}>
							{todo.label}
							<span
								className="buttonDelete"
								onClick={handleDeleteTodo(index)}>
								x
							</span>
						</li>
					))}
				</ul>
				<div>{todos.length} Item left </div>
			</div>
		</div>
	);
};

export default Home;
