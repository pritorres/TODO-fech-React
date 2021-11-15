import { request } from "../tools/fetch";

export const getTodos = username => {
	return request(`user/${username}`);
};

export const createTodoList = username => {
	return request(`user/${username}`, {
		method: "POST",
		body: JSON.stringify([])
	});
};

export const updateTodoList = (username, list) => {
	return request(`user/${username}`, {
		method: "PUT",
		body: JSON.stringify(list)
	});
};

export const deleteTodoList = username => {
	return request(`user/${username}`, { method: "DELETE" });
};
