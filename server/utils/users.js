// id: socket.id
// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

var users = [];

/*
class Person {
	constructor(name, age) {
		this.name = name;
		this.age  = age;	
	}

	getUserDescription() {
		return `${this.name} is ${this.age} year(s) old`;
	}
}
*/

class Users {
	constructor() {
		this.users = [];
	}

	addUser(id, name, room) {
		var user = {id: id, name: name, room: room};
		this.users.push(user);

		return user;
	}

	removeUser(id) {
		/*
		var user = null;

		this.users.forEach((el, index) => {
			if(el.id === id) {
				user = el;

				this.users.splice(index, 1);
			}
		});
		*/

		var user = this.getUser(id);

		if(user) {
			this.users = this.users.filter((user) => {
				return user.id !== id;
			});
		}

		return user;
	}

	getUser(id) {
		/*
		var user = null;

		this.users.forEach((el, index) => {
			if(parseInt(el.id) === parseInt(id)) {
				user = el;
			}
		});

		return user;	
		*/

		var _user = this.users.filter((user) => { 
			return user.id === id; 
		})[0];

		if(_user === undefined) {
			return null;
		}

		return _user;
	}

	/**
	 *
	 */
	getUserList(room) {
		var users = this.users.filter((user) => {
			return user.room === room;
		});

		var namesArray = users.map((user) => {
			return user.name;
		});

		return namesArray;
	}

	getUserByName(name) {
		var user = this.users.filter((user) => {
			return user.name === name;
		})[0];

		if(user) {
			return user;
		}

		return null;
	}
}

module.exports = {Users};