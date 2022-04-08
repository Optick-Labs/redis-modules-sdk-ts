"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisearchHelpers = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
var module_base_1 = require("../module.base");
var RedisearchHelpers = /** @class */ (function () {
    function RedisearchHelpers() {
    }
    /**
     * Parses `spellcheck` response into a list of objects.
     * @param response The response array from the spellcheck command
     */
    RedisearchHelpers.prototype.handleSpellcheckResponse = function (response) {
        var output = [];
        for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
            var term = response_1[_i];
            output.push({
                term: term[1],
                suggestions: term[2].map(function (suggestionArrayElem) {
                    return {
                        score: suggestionArrayElem[0],
                        suggestion: suggestionArrayElem[1]
                    };
                })
            });
        }
        return output;
    };
    /**
     * Handling the response of the aggregate function
     * @param response The raw response from the command execution
     * @returns A parsed response of the raw response
     */
    RedisearchHelpers.prototype.handleAggregateResponse = function (response) {
        var numberOfItems = response[0];
        var items = [];
        for (var i = 1; i < response.length; i++) {
            items.push({
                name: response[i][0],
                value: response[i][1]
            });
        }
        return {
            numberOfItems: numberOfItems,
            items: items
        };
    };
    /**
     * Parsing the response of Search QUERY
     * @param response The raw response from Redis
     * @returns A parsed or processed response
     */
    RedisearchHelpers.prototype.handleQueryResponse = function (response) {
        //Search queries should be parsed into objects, if possible.
        var responseObjects = response;
        //If the response is an array with 1 item, we will return it as the value.
        if (Array.isArray(response) && response.length === 1 && !Array.isArray(response[0])) {
            (0, module_base_1.log)(module_base_1.LogLevel.DEBUG, "The response is ".concat(response[0]));
            return response[0];
        }
        //In case we have an array with a odd number of items, we will parse it as required. 
        else if (Array.isArray(response) && response.length % 2 === 1) {
            // Put index as 0th element
            responseObjects = [response[0]];
            // Go through returned keys (doc:1, doc:2, ...)
            for (var i = 1; i < response.length; i += 2) {
                // propertyArray is the key-value pairs eg: ['name', 'John']
                var propertyArray = response[i + 1];
                responseObjects.push({
                    key: response[i] //This is the key, 'eg doc:1'
                });
                if (Array.isArray(propertyArray) && propertyArray.length % 2 === 0) {
                    for (var j = 0; j < propertyArray.length; j += 2) {
                        // Add keys to last responseObjects item
                        // propertyArray[j] = key name
                        // propertyArray[j+1] = value
                        responseObjects[responseObjects.length - 1][propertyArray[j]] = propertyArray[j + 1];
                    }
                }
            }
        }
        //Check for a single dimensional array, these should only be keys, if im right
        else if (response.every(function (entry) { return !Array.isArray(entry); })) {
            responseObjects = [response[0]];
            for (var i = 1; i < response.length; i++) {
                responseObjects.push({
                    key: response[i],
                });
            }
        }
        else {
            (0, module_base_1.log)(module_base_1.LogLevel.DEBUG, 'Parsing response to JSON:');
            var responses = response;
            var resultCounts = responses[0];
            responseObjects = {};
            responseObjects.resultsCount = resultCounts;
            responseObjects.documentIds = [];
            responseObjects.data = [];
            for (var i = 1; i < responses.length; i++) {
                if (Array.isArray(responses[i])) {
                    responseObjects.data = responseObjects.data.concat(responses[i]);
                }
                else {
                    responseObjects.documentIds.push(responses[i]);
                }
            }
        }
        return responseObjects;
    };
    return RedisearchHelpers;
}());
exports.RedisearchHelpers = RedisearchHelpers;
