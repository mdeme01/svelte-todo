import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { v4 as uuid } from 'uuid';

type Todo = {
	id: string;
	text: string;
	completed: boolean;
	editing: boolean;
};

const createTodos = () => {
	const initialTodos = browser ? (JSON.parse(localStorage.getItem('todos') ?? '[]') as Todo[]) : [];

	const { subscribe, update } = writable<Todo[]>(initialTodos);

	const addTodo = (text: string) => {
		return update((todos) => {
			const newValue = [...todos, { text, id: uuid(), completed: false, editing: false }];
			if (browser) localStorage.setItem('todos', JSON.stringify(newValue));
			return newValue;
		});
	};

	const removeTodo = (id: string) => {
		return update((todos) => {
			const newValue = todos.filter((t) => t.id !== id);
			if (browser) localStorage.setItem('todos', JSON.stringify(newValue));
			return newValue;
		});
	};

	const updateTodo = (id: string, text: string) => {
		return update((todos) => {
			const todoToUpdate = todos.find((t) => t.id === id) as Todo;
			const otherTodos = todos.filter((t) => t.id !== id);
			const updatedTodo = {
				text,
				id,
				completed: todoToUpdate.completed,
				editing: todoToUpdate.editing
			};
			const newValue = [...otherTodos, updatedTodo];
			if (browser) localStorage.setItem('todos', JSON.stringify(newValue));
			return newValue;
		});
	};

	const toggleCompleted = (id: string) => {
		return update((todos) => {
			const newValue = todos.map((t) =>
				t.id === id ? { id: t.id, text: t.text, completed: !t.completed, editing: t.editing } : t
			);
			if (browser) localStorage.setItem('todos', JSON.stringify(newValue));
			return newValue;
		});
	};

	const toggleEditing = (id: string) => {
		return update((todos) => {
			const newValue = todos.map((t) =>
				t.id === id ? { id: t.id, text: t.text, completed: t.completed, editing: !t.editing } : t
			);
			if (browser) localStorage.setItem('todos', JSON.stringify(newValue));
			return newValue;
		});
	};

	return {
		subscribe,
		addTodo,
		removeTodo,
		updateTodo,
		toggleCompleted,
		toggleEditing
	};
};

export const todos = createTodos();
