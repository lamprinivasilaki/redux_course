import expect from 'expect';
import deepFreeze from 'deep-freeze';


const addCounter = (list) => {
	// push method causes mutation and it
	// cannot pass the deepFreeze test
	// list.push(0);

	// concat method works perfectly without mutations
	// I just replace it with es6 spread operator
	// return list.concat([0]);

	return [...list, 0];
};

const removeCounter = (list, index) => {
	// splice is a mutative method,
	// so I cannot use it with Redux
	// list.splice(index, 1);

	// slice & concat works with Redux,
	// but I use again ES6 array spread operator
	// return list
	// 	.slice(0, index)
	// 	.concat(list.slice(index + 1));

	return [
		...list.slice(0, index),
		...list.slice(index + 1)
	];
};

const incrementCounter = (list, index) => {
	// this is, of course, a mutation
	// list[index]++;

	// This works fine and without mutations
	// I replace it with ES6 array spread operator
	// return list
	// 	.slice(0, index)
	// 	.concat(list[index] + 1)
	// 	.concat(list.slice(index + 1));

	return [
		...list.slice(0, index),
		list[index] + 1,
		...list.slice(index + 1)
	];
};

const testAddCounter = () => {
	const listBefore = [];
	const listAfter = [0];

	deepFreeze(listBefore);

	expect(
		addCounter(listBefore)
	).toEqual(listAfter);
};

const testRemoveCounter = () => {
	const listBefore = [0, 10, 20];
	const listAfter = [0, 20];

	deepFreeze(listBefore);

	expect(
		removeCounter(listBefore, 1)
	).toEqual(listAfter);
};

const testIncrementCounter = () => {
	const listBefore = [0, 10, 20];
	const listAfter = [0, 11, 20];

	deepFreeze(listBefore);

	expect(
		incrementCounter(listBefore, 1)
	).toEqual(listAfter);
};

testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log('All tests passed.');
