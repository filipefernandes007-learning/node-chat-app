const expect 	   	 = require('expect');
const {isRealString} = require('./validation.js');

describe('isRealString', () => {
	it('It should reject non-string values', (done) => {
		expect(isRealString(98)).toBe(false);
		done();
	});

	it('It should reject string with only spaces', (done) => {
		expect(isRealString(' ')).toBe(false);
		done();
	});

	it('It should reject allow string with non-spaces characters', (done) => {
		expect(isRealString(' fx ')).toBe(true);
		done();
	});
});
