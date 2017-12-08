const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Mike',
			room: 'Node course'
		},
		{
			id: '2',
			name: 'Jen',
			room: 'React course'
		},
		{
			id: '3',
			name: 'Julie',
			room: 'Node course'
		}];
	});

	it('It should create/add a new user', () => {
		var _users = new Users();
		var user = {id: 123, name: 'Fx', room: 'The office fans'};
		var res  = _users.addUser(user.id, user.name, user.room);

		expect(_users.users).toEqual([user]);
	});

	it('It should return names for node course', () => {
		var names = users.getUserList('Node course');

		expect(names).toEqual(['Mike','Julie']);
	});

	it('It should remove a user', () => {
		var size = users.users.length;
		var user = users.removeUser('1');

		expect(user.id).toBe('1');
		
		expect(users.users.length).toBe(size-1);
	});

	it('It should not remove user', () => {
		var size = users.users.length;
		var user = users.removeUser('123');

		expect(user).toBe(null);
		expect(users.users.length).toBe(size);
	});

	it('It should find a user', () => {
		var user = users.getUser('1');

		expect(user.id).toBe('1');
	});

	it('It should not find a user', () => {
		var user = users.getUser('123');

		expect(user).toBe(null);
	});
});;