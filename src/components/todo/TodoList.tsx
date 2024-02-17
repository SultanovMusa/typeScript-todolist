import axios from "axios";
import scss from "./TodoList.module.scss";
import { useEffect, useState } from "react";
import { CgUserlane } from "react-icons/cg";
import { TbPasswordFingerprint } from "react-icons/tb";

interface Todo {
	_id: number;
	title: string;
	password: string;
	isAuth: boolean;
}

const url = import.meta.env.VITE_BACKENT_URL;

const TodoList: React.FC = () => {
	//! State
	const [state, setState] = useState<Todo[]>([]);
	const [render, setRender] = useState<string>("");
	const [passwordRender, setPasswordRender] = useState<string>("");
	const [nameInput, setNameInput] = useState<string>("");
	const [passwordInput, setPasswordInput] = useState<string>("");
	const [isEditId, setIsEditId] = useState<number>(0);

	//! Post Todo
	const postTodo = async () => {
		if (render.trim() === "" || passwordRender.trim() === "") return;
		const newTodo = {
			title: render,
			password: passwordRender,
			isAuth: false,
		};
		setRender("");
		setPasswordRender("");

		const response = (await axios.post(url, newTodo)).data;
		setState(response);
		getTodo();
	};

	//! Get Todo
	const getTodo = async () => {
		const response = (await axios.get(url)).data;
		setState(response);
	};

	//! Delete Todo
	const deleteTodo = async (id: number) => {
		const response = (await axios.delete(`${url}/${id}`)).data;
		setState(response);
	};

	//! Patch Todo
	const patchTodo = async (id: number) => {
		const putData = {
			title: nameInput,
			password: passwordInput,
		};
		const response = (await axios.patch(`${url}/${id}`, putData)).data;
		setState(response);
		setIsEditId(0);
		getTodo();
	};

	//! useEffect
	useEffect(() => {
		getTodo();
	}, []);

	//! Return
	return (
		<>
			<div className={scss.container}>
				<h1>TodoList💫</h1>

				<div className={scss.input_box}>
					<input
						className={scss.input}
						type="email"
						value={render}
						onChange={(e) => setRender(e.target.value)}
						placeholder="Email@❤️"
					/>
					<CgUserlane className={scss.icon} />
				</div>

				<div className={scss.input_box}>
					<input
						className={scss.input}
						type="password"
						value={passwordRender}
						onChange={(e) => setPasswordRender(e.target.value)}
						placeholder="Password🗽"
					/>
					<TbPasswordFingerprint className={scss.icon} />
				</div>
				<button onClick={postTodo}>Add</button>
			</div>
			<div className={scss.loader}></div>
			{/*  */}
			{state.map((item) => (
				<div key={item._id}>
					{isEditId === item._id ? (
						<div className={scss.car}>
							<h2>📝</h2>
							<div className={scss.input_box}>
								<input
									className={scss.inputs}
									type="email"
									value={nameInput}
									onChange={(e) => setNameInput(e.target.value)}
									placeholder="Email@❤️"
								/>
								<TbPasswordFingerprint className={scss.icon} />
							</div>

							<div className={scss.input_box}>
								<input
									className={scss.inputs}
									type="password"
									value={passwordInput}
									onChange={(e) => setPasswordInput(e.target.value)}
									placeholder="Password🗽"
								/>
								<TbPasswordFingerprint className={scss.icon} />
							</div>
							<button onClick={() => patchTodo(item._id)}>Update</button>
							<button onClick={() => setIsEditId(0)}>Cancel</button>
						</div>
					) : (
						<div className={scss.card}>
							<h3>🔥</h3>
							<p>
								Email🥷 <span>{item.title}</span>
							</p>
							<p>
								Password🔐 <span>{item.password}</span>
							</p>
							<button onClick={() => deleteTodo(item._id)}>Delete</button>
							<button
								onClick={() => {
									setIsEditId(item._id);
									setNameInput(item.title);
									setPasswordInput(item.password);
								}}>
								Edit
							</button>
						</div>
					)}
				</div>
			))}
		</>
	);
};

export default TodoList;
