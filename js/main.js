// ----- Classes ------

// Javascript doesn't have pure classes, it has prototypal inheritance.
// ES6 has a classes feature to address this.

// Object constructor
// function Car(options) {
// 	this.title = options.title;
// };

// adding a function to the object constructor
// Car.prototype.drive = function() {
// 	return "vroom";
// }

// creating a new instance of the object
// const car = new Car({ title: 'Focus' });

// car.drive(); // returns 'vroom'
// car // returns Car { title: "Focus" }


// REFACTORING WITH CLASSES
// In ES5, we would have to do the following to create the inheritance:
// function Car(options) {
// 	this.title = options.title;
// };

// Car.prototype.drive = function() {
// 	return "vroom";
// };

// function Toyota(options) {
// 	Car.call(this, options);
// 	this.color = options.color
// };

// Toyota.prototype = Object.create(Car.prototype);
// Toyota.prototype.constructor = Toyota;

// Toyota.prototype.honk = function() {
// 	return 'beep';
// }

// const toyota = new Toyota({ color: 'red', title: 'Daily Driver' })
// toyota; // returns { title: 'Daily Driver', color: 'red' }
// toyota.drive(); // returns 'vroom'
// toyota.honk(); // returns 'beep'


// REFACTOR IN ES6 with classes. The benefit is that we can bypass setting up constructor function, worrying about the prototype, inheritance, etc.
// Just doing this gives me a class object of Car:
// class Car {
// 	constructor(options) {
// 		this.title = options.title
// 	}
// 	// Destructured:
// 	// constructor({ title }) {
// 	// 	this.title = title;
// 	// }
// 	// To add a method inside of a class, we use the enhanced object literal syntax
// 	drive() {
// 		return 'vroom';
// 	}
// }

// const car = new Car(); // This gives us a new instance of the Car object
// const car = new Car({ title: 'Toyota' }); // This gives us a new instance with the title property included
// car;
// car.drive(); // returns 'vroom'


// EXTENDING BEHAVIOR WITH CLASSES

// class Car {
// 	constructor({ title }) {
// 		this.title = title;
// 	}

// 	drive() {
// 		return 'vroom';
// 	}
// }

// class Toyota extends Car { // extends Car ensures that the Toyota class inherites the methods of Car
// 	// constructor is the only method that will be called automatically when we create a new instance of Toyota
// 	constructor(options) { // Usually, instead of destructuring the constructor, we take in the entire object and pass it along to super, and do any assignment we have to do in our local constructor, as well.
// 		super(options); // Think of it as car.constructor
// 		this.color = options.color;
// 	}

// 	honk() {
// 		return 'beep';
// 	}
// }

// const toyota = new Toyota({ color: 'red', title: "Daily Driver" });
// toyota; // returns {'color':'red'}
// toyota.honk(); // returns 'beep'


// You're a game developer tasked with setting up some basic classes for a new game you are working on. Create a class called 'Monster'. In the constructor, you'll need to do some basic set up for Monster whenever they are created.
// Initialize the Monster's health to 100
// The constructor will be called with an 'options' object that has a 'name' property. Assign the 'name' to the Monster.

// class Monster {
// 	constructor(options) {
// 		this.health = 100;
// 		this.name = options.name;
// 	}
// }

// const fireUnicorn = new Monster({ name: 'HeartFire' });


// Now that you have a monster created, create a subclass of the Monster called Snake.
// The Snake should have a 'bite' method. The only argument to this method is another instance of Snake.
// The instance of Snake that is passed in should have it's health deducted by 10.

// class Snake extends Monster {
// 	constructor(options) {
// 		super(options);
// 	}

// 	bite(Snake) {
// 		Snake.health = Snake.health - 10;
// 	}
// }










