'use strict';

var server = require('server');
var page = module.superModule;

server.extend(page);

server.prepend('AddProduct', function (req, res, next) {
	
	if (session.custom.ajaxredirecturl)
	{
		res.addHttpHeader('X-SF-CC-QUEUEIT', session.custom.ajaxredirecturl );
		res.json({ success: false });
		return next();
	}
	else 
	{
		next();
	}
});

module.exports = server.exports();
