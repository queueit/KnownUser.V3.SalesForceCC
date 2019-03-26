'use strict';

/**
 * The onRequest hook is called with every top-level request in a site. This happens both for requests to cached and non-cached pages.
 * For performance reasons the hook function should be kept short.
 *
 * @module  request/OnRequest
 */

var Status = require('dw/system/Status');

var QueueIt = require('int_queueit/cartridge/scripts/QueueIt.js');

/**
 * The onRequest hook function.
 */
exports.onRequest = function () {
	
	QueueIt.Start();
	
	
	
    return new Status(Status.OK);
};
