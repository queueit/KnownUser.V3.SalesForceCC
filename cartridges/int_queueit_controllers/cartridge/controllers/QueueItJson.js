'use strict';

/**
 * Controller that renders the home page.
 *
 * @module controllers/Home
 */

var app = require('*/cartridge/scripts/app');
var guard = require('*/cartridge/scripts/guard');

/**
 * Renders the home page.
 */
function show() {
	
	response.addHttpHeader('X-SF-CC-QUEUEIT', session.custom.ajaxredirecturl );
    app.getView().render('queueit/queueiterror');
}


/*
 * Export the publicly available controller methods
 */
/** Renders the home page.
 * @see module:controllers/QueueItJson~show */
exports.Show = guard.ensure(['get'], show); 
