var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('It should generate correct message object', () => {
        var from = 'Me';
        var text = 'Hello';

        var res = generateMessage(from, text);

        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(typeof res.createdAt).toBe('number');
        expect(res).toMatchObject({
            from: from,
            text: text,
            createdAt: res.createdAt
        });
    });
});