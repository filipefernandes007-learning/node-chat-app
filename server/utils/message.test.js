var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('It should generate correct message object', () => {
        var from = 'Me';
        var text = 'Hello'; 
        var res  = generateMessage(from, text);

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

describe('generateLocationMessage ', () => {
    it('It should generate corrent location object', () => {
        var from = 'Me';
        var lat  = 15;
        var lg   = 19;
        var url  = 'https://www.google.com/maps?q=15,19';
        var msg  = generateLocationMessage(from, lat, lg);

        expect(msg.from).toBe(from);
        expect(msg.url).toBe(url);
        expect(typeof msg.createdAt).toBe('number');
    });    
});
