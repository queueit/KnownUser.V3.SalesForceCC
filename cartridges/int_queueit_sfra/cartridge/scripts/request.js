'use strict';
exports.onRequest = function() {
	var QueueIt = require('~/cartridge/scripts/QueueIt.js');
	QueueIt.Start();
}
