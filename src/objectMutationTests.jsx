import expect from 'expect';
import deepFreeze from 'deep-freeze';

const toggleTodo = (todo) => {
	// This way causes mutation, so it cannot be
	// used with Redux
	// todo.completed = ! todo.completed;
	// return todo;

	// This way works fine, there is a more efficient
	// and effective way to achieve it.
	// return {
	// 	id: todo.id,
	// 	text: todo.text,
	// 	completed: !todo.completed
	// };

	// This way works perfectly, but we can do it
	// using the ES7 object spread operator
	// return Object.assign({}, todo, {
	// 	completed: !todo.completed
	// });

	return {
		...todo,
		completed: !todo.completed
	};
};

const testToggleTodo = () => {
	const todoBefore = {
		id: 0,
		text: 'Learn Redux',
		completed: false
	};
	const todoAfter = {
		id: 0,
		text: 'Learn Redux',
		completed: true
	};

	deepFreeze(todoBefore);

	expect(
		toggleTodo(todoBefore)
	).toEqual(todoAfter);
};

testToggleTodo();
console.log('All tests passed.');
