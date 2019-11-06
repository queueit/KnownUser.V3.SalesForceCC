'use strict';

/*
 * Implements generic httpContextProvider consumed by queueit sdk library
 * 
 */
var StringUtils = require('dw/util/StringUtils');


exports.httpContextProvider = function() {
    return {
        getHttpRequest: function() {
            return {
                getAbsoluteUri: function() { 
					return request.httpURL;
                },
                getUserAgent: function() { 
                	 return request.httpUserAgent;
                },
                getHeader: function (name)
                {
        			var headers = request.httpHeaders;
        			if (headers.containsKey(name))
        			{
        				return headers.get(name);
        			}
        			return '';
        		},
        		getUserHostAddress : function()
        		{
        			return request.httpHost;
        		},
        		getCookieValue : function (cookieKey)
        		{
        			var cookies = request.getHttpCookies();

        			if (cookieKey in cookies)
        			{
        				var cookie =cookies[cookieKey]; 
        				var cookieVal = decodeURIComponent(cookie.value); 
        				return cookieVal;
        			}
        			else { 
        				return '';
        			}
        		}, 
        		getRequestBodyAsString: function() 
        		{ 
        			if (request.httpParameterMap.pid) { 
        				return 'pid=' + request.httpParameterMap.pid.toString();
        			}
        			return '';
        		}
            }
            
            
        },
        getHttpResponse: function() {
            return {
            	setCookie : function(cookieName, cookieValue, domain, expir) {
            		
            		var cookieToAdd = require('dw/web/Cookie')(cookieName, encodeURIComponent( cookieValue));
            		if (!((domain == null) || (domain == ''))) {
            			cookieToAdd.setDomain(domain);
            		}
            		cookieToAdd.setPath('/');
					var maxAge = parseInt(expir) - Math.floor( new Date().getTime() / 1000  );
					cookieToAdd.setMaxAge(maxAge);
        			
        			response.addHttpCookie(cookieToAdd);
        			return '';
            	}
            }}
    };
};


