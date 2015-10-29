/* CREATION OF A CLASS*/

/* CREATION OF A STANDARD FACTORY OBJECT */

function createPerson( firstName, lastName ) {

  var person = {
    get firstName () {
      return firstName;
    },

    get lastName () {
      return lastName;
    },

    greet: function ( name ) {
      console.log('Hello, ' + name + ' my name is ' + firstName );
        return 'Hello, '    + name + ' my name is ' + firstName + ' ' + lastName;
    }
   };

    return person;
}

var person1 = createPerson( 'Tom', 'Jones' );
var person2 = createPerson( 'Ben', 'Stiller' );

var output = document.getElementById('output');
person1.greet('Tony');
output.innerHTML += person1.greet('Tony') + '<br />';
person2.greet('Betty');
output.innerHTML += person2.greet('Betty') + '<br />';

/* USING A FACTORY FUNCTION */
function Person1 (config) {// i like using a config object instead of remembering a bunch of arguments

	this.firstName = config.firstName;
	this.lastName  = config.lastName;

	//Object.defineProperty(this, 'firstName', { // would make our factor have some privacy.
	//	get: function () { return firstName; }// we don't want to define functions in our Factory.
	//});
}

Person1.prototype.greet = function ( name ) {// we define our methods on the prototype, it has many benefits.
	return 'Hello , ' + name + ' I am ' + this.firstName + ' ' + this.lastName + '.';
};

var person1 = new Person1({ firstName: 'Tommy', lastName: 'Bolan' });
var person2 = new Person1({ firstName: 'Ben', lastName: 'Cherry' });

var output2 = document.getElementById('output2');
person1.greet('Tony');
output2.innerHTML += person1.greet('Tony') + '<br />';
person2.greet('Betty');
output2.innerHTML += person2.greet('Betty') + '<br />';

/* USING SYMBOLS FOR PRIVACY */
// We can wrap the function in an IIFE
// to protect our members on the Person data type

var Person = (function () {
  // we are creating a new Data Type called Person
  // with symbols we can create privacy
  var firstNameSymbol = Symbol();
	var lastNameSymbol  = Symbol();

  function Person (config) {

    this[firstNameSymbol] = config.firstName;
    this[lastNameSymbol]  = config.lastName;
}

  Person.prototype.greet = function ( name ) {
    return 'Hello, ' + name + ' I am ' + this[firstNameSymbol] + ' ' + this[lastNameSymbol];
  };
  // with this approach we have lost access
  // to our firstName and lastName properties
  // so we need to define them on the prototype
  // with Object.defineProperty or Object.defineProperties

  // I find the Object.defineProperty is cleaner
  Object.defineProperty(Person.prototype, 'firstName', {
    get:  function () { return this[firstNameSymbol]; }
  });

  // these properties are now getters and we now
  // have access to the first and last name properties now
  Object.defineProperty(Person.prototype, 'lastName', {
    get:  function () { return this[lastNameSymbol]; }
  });

	// now we have true privacy in our Object or Data Type of Person
	// nothing outside this IIFE can access our firstName and lastName
	// properties.

	// We can create static methods on our Object like this:
	// Just like in Java or C#

  Person.renamePerson = function (person, lastName) {
    person[lastNameSymbol] = lastName;
  };

  return Person;

}());


var person = new Person({
	firstName :'Joey',
	lastName  :'Buttafuccuo'
});
var output3 = document.getElementById('output3');
person.greet('Lolita');

output3.innerHTML += person.greet('Lolita');
