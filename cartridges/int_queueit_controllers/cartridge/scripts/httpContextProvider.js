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
        		getBody: function() 
        		{ 
        			
        			if (request.httpParameterMap.requestBodyAsString) { 
        				return request.httpParameterMap.requestBodyAsString;
        			}
        			return '';
        		}
            }
            
            
        },
        getHttpResponse: function() {
            return {
            	setCookie : function(cookieName, cookieValue, domain, expir) {
            		
            		var cookieToAdd = require('dw/web/Cookie').Cookie(cookieName, cookieValue);
        			cookieToAdd.domain = domain;
        			cookieToAdd.setMaxAge(expir);
        			
        			response.addHttpCookie(cookieToAdd);
        			return '';
            	}
            }}
    };
};


