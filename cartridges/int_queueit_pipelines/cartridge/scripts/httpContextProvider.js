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
					const protocol = this.getHeader('x-forwarded-proto') || this.getHeader('x-is-server_port_secure') === "1" ? 'https' : 'http';
					let url = protocol  + '://' + this.getHeader('x-is-host') + this.getHeader('x-is-path_translated');
					if (request.httpQueryString) {
						url = url + '?' + request.httpQueryString;
					}
					return url;
                },
                getUserAgent: function() { 
                	 request.httpUserAgent;
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
            			cookieToAdd.domain = domain;
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


