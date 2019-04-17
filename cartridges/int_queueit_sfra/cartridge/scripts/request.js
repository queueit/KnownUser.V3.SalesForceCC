'use strict';
exports.onRequest = function() {
	// For a quick short-circuit, it's expected customer ID and secret key are stored in one
	// site pref separated by a pipe '|' as a string to enable and an empty string if disabled
	var sitePrefs = require('dw/system/Site').getCurrent().getPreferences();
	var queueItConfigs = 'queueItEnabled' in sitePrefs.getCustom() && sitePrefs.getCustom()["queueItEnabled"] ? sitePrefs.getCustom()["queueItEnabled"] : null;
	
	if (queueItConfigs) {
		// NOTE: probably want this to be inclusionary vs exclusionary: only do this logic if 
		// page show / category show / add to cart Request Prefilter
		var configs = configs =  'queueItCustomerId' in sitePrefs.getCustom() && sitePrefs.getCustom()["queueItCustomerId"] ? sitePrefs.getCustom()["queueItCustomerId"] : null;
		configs += '|' + 'queueItSecretKey' in sitePrefs.getCustom() && sitePrefs.getCustom()["queueItSecretKey"] ? sitePrefs.getCustom()["queueItSecretKey"] : null;
		
		if (!(request.httpURL.toString().indexOf('__Analytics') >= 0)){
			require('~/cartridge/scripts/QueueIt.js').Start(configs);
		}
	}
}
