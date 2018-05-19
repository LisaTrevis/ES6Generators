// ----- Generators ------

// A function that we can enter and exit multiple times. Perfect for iterating though any data structure that we want.


// The forOf loop is used for iterating through arrays of data
// const colors = [ 'red', 'blue', 'green' ];

// for (let color of colors) { // iterates through each element in the colors array
// }

// console.log(colors);
// const numbers = [ 1, 4, 6 ];

// let total = 0;
// for (let number of numbers) {
// 	total += number;
// }

// console.log(total); // returns 11


// An asterisk turns the function into a generator. The star can be after function or before the name of the function, i.e. function* numbers OR function *numbers, both are fine.
// function* numbers() {
// 	yield; // The yield keyword is used in generators
// }

// const gen = numbers();
// gen.next(); // returns false
// gen.next(); // returns true


// Let's look at an example:
// function* shopping() {
// 	// stuff on the sidewalk
// 	// walking down the sidewalk
// 	// go into the store with cash
// 	const stuffFromStore = yield 'cash';

// 	// What if we wanted to stop at the dry cleaners on the way home from the grocery store? Now we're walking to the laundromat.
// 	const cleanClothes = yield 'laundry';

// 	// walking back home
// 	return [ stuffFromStore, cleanClothes ];
// }

// stuff in the store
// declaring gen doesn't actually generate anything
// const gen = shopping();
// gen.next(); // leaving our house
// // walked into the store
// // walking up and down the aisles
// // purchase our stuff
// gen.next('groceries'); // leaving the store with groceries

// gen.next('clean clothes');

// So, we can call yield multiple times, unlike return which breaks us out of the function. However, we need a gen.next statement for every yield in our generator.


// HOW DO GENERATORS WORK? TYING BACK INTO THE FOROF LOOP

// function* colors() {
// 	yield 'red';
// 	yield 'blue';
// 	yield 'green';
// }

// const gen = colors();
// gen.next(); // returns {'value':'red', 'done':false}
// gen.next(); // returns {'value':'blue', 'done':false}
// gen.next(); // returns {'value':'green', 'done':false}
// gen.next(); // returns {'done':true} i.e. no more yields

// Generators work perfectly with for of loops

// function* colors() {
// 	yield 'red';
// 	yield 'blue';
// 	yield 'green';
// }

// const myColors = [];
// for (let color of colors()) {
// 	myColors.push(color);
// }

// myColors; // returns [ 'red', 'blue', 'green']


// Let's look at a practical example where we only want to iterate through the employees in this object, and not the size or department:
// const engineeringTeam = {
// 	size: 3,
// 	department: 'Engineering',
// 	lead: 'Jill',
// 	manager: 'Alex',
// 	engineer: 'Dave',
// 	testingTeam: testingTeam
// };

// Regular function:
// function employees() {
// 	const names = [];
// 	names.push(engineeringTeam.lead, engineeringTeam.manager, engineeringTeam.engineer)
// 	return names;
// }

// Generator function:

// const names = [];

// function* TeamIterator(team) {
// 	yield team.lead;
// 	yield team.manager;
// 	yield team.engineer;
// }


// How to combine generators together

// const testingTeam = {
// 	lead: 'Amanda',
// 	tester: 'Bill'
// }

// const engineeringTeam = {
// 	// testingTeam: testingTeam can be condensed down, and following convention, condensed key value pairs go at the top of the list.
// 	testingTeam,
// 	size: 3,
// 	department: 'Engineering',
// 	lead: 'Jill',
// 	manager: 'Alex',
// 	engineer: 'Dave'
// };

// function* TeamIterator(team) {
// 	yield team.lead;
// 	yield team.manager;
// 	yield team.engineer;
// 	// We could put this: yield team.testingTeam.lead, but it's better to make a separate generator for it instead so that it's more reusable in the future
// 	const testingTeamGenerator = TestingTeamIterator(team.testingTeam);
// 	// yield* is like a trap door which drops the iterator down into the other generator function to run as many times there as there are yield statements in the trap door generator, and is known as generator delegation.
// 	yield* testingTeamGenerator;
// }

// function* TestingTeamIterator(team) {
// 	yield team.lead;
// 	yield team.tester;
// }

// const names = [];
// // Generators are great because we can use it on multiple teams, and just pass each team into TeamIterator as an argument
// for (let name of TeamIterator(engineeringTeam)) {
// 	names.push(name);
// }


// Now let's clean up that code with a [Symbol.iterator] which is a tool that teaches objects how to respond to the for of loop:

// const testingTeam = {
// 	lead: 'Amanda',
// 	tester: 'Bill',
// 	[Symbol.iterator]: function* () {
// 		// using this within the generator function points to testingTeam, so is the same thing as testingTeam.lead and testingTeam.tester
// 		yield this.lead;
// 		yield this.tester;
// 	}
// };

// const engineeringTeam = {
// 	testingTeam,
// 	size: 3,
// 	department: 'Engineering',
// 	lead: 'Jill',
// 	manager: 'Alex',
// 	engineer: 'Dave',
// 	[Symbol.iterator]: function* () {
// 		yield this.lead;
// 		yield this.manager;
// 		yield this.engineer;
// 		yield* this.testingTeam;
// 	}
// };

// const names = [];

// for (let name of engineeringTeam) {
// 	names.push(name);
// }


// Let's look at a practical use for this, iterating through a tree structure:

// class Comment {
// 	constructor(content, children) {
// 		this.content = content;
// 		this.children = children;
// 	}

// 	// This is how we write methods in a class
// 	*[Symbol.iterator]() {
// 		yield this.content;
// 		for (let child of this.children) {
// 			yield* child;
// 		}
// 	}
// }

// const children = [
// 	new Comment('good comment', []),
// 	new Comment('bad comment', []),
// 	new Comment('meh', [])
// ];

// const tree = new Comment('Great post!', children);

// const values = [];
// for (let value of tree) {
// 	values.push(value);
// }