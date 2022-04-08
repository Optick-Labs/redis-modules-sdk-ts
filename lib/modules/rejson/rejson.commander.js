"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejsonCommander = void 0;
var RejsonCommander = /** @class */ (function () {
    function RejsonCommander() {
    }
    /**
     * Deleting a JSON key
     * @param key The name of the key
     * @param path The path of the key defaults to root if not provided. Non-existing keys and paths are ignored. Deleting an object's root is equivalent to deleting the key from Redis.
     * @returns The number of paths deleted (0 or 1).
     */
    RejsonCommander.prototype.del = function (key, path) {
        var parameters = [key];
        if (path !== undefined)
            parameters.push(path);
        return {
            command: 'JSON.DEL',
            args: parameters
        };
    };
    /**
     * Clearing a JSON key
     * @param key The name of the key
     * @param path The path of the key defaults to root if not provided. Non-existing keys and paths are ignored. Deleting an object's root is equivalent to deleting the key from Redis.
     * @returns The number of paths deleted (0 or 1).
     */
    RejsonCommander.prototype.clear = function (key, path) {
        var parameters = [key];
        if (path !== undefined)
            parameters.push(path);
        return {
            command: 'JSON.CLEAR',
            args: parameters
        };
    };
    /**
     * Toggling a JSON key
     * @param key The name of the key
     * @param path The path of the key defaults to root if not provided. Non-existing keys and paths are ignored. Deleting an object's root is equivalent to deleting the key from Redis.
     * @returns The value of the path after the toggle.
     */
    RejsonCommander.prototype.toggle = function (key, path) {
        var parameters = [key];
        if (path !== undefined)
            parameters.push(path);
        return {
            command: 'JSON.TOGGLE',
            args: parameters
        };
    };
    /**
     * Setting a new JSON key
     * @param key The name of the key
     * @param path The path of the key
     * @param json The JSON string of the key i.e. '{"x": 4}'
     * @param condition Optional. The condition to set the JSON in.
     * @returns Simple String OK if executed correctly, or Null Bulk if the specified NX or XX conditions were not met.
     */
    RejsonCommander.prototype.set = function (key, path, json, condition) {
        var args = [key, path, json];
        if (condition) {
            args.push(condition);
        }
        return {
            command: 'JSON.SET',
            args: args
        };
    };
    /**
     * Retrieving a JSON key
     * @param key The name of the key
     * @param path The path of the key
     * @param parameters Additional parameters to arrange the returned values
     * @returns The value at path in JSON serialized form.
     */
    RejsonCommander.prototype.get = function (key, path, parameters) {
        var args = [key];
        for (var parameter in parameters) {
            var name_1 = parameter.toUpperCase();
            var value = parameters[parameter];
            args.push(name_1);
            if (typeof value !== 'boolean')
                args.push(value);
        }
        if (path !== undefined)
            args.push(path);
        return {
            command: 'JSON.GET',
            args: args
        };
    };
    /**
     * Retrieving values from multiple keys
     * @param keys A list of keys
     * @param path The path of the keys
     * @returns The values at path from multiple key's. Non-existing keys and non-existing paths are reported as null.
     */
    RejsonCommander.prototype.mget = function (keys, path) {
        var args = keys;
        if (path !== undefined)
            args.push(path);
        return {
            command: 'JSON.MGET',
            args: args
        };
    };
    /**
     * Retrieving the type of a JSON key
     * @param key The name of the key
     * @param path The path of the key
     * @returns Simple String, specifically the type of value.
     */
    RejsonCommander.prototype.type = function (key, path) {
        var args = [key];
        if (path !== undefined)
            args.push(path);
        return {
            command: 'JSON.TYPE',
            args: args
        };
    };
    /**
     * Increasing JSON key value by number
     * @param key The name of the key
     * @param number The number to increase by
     * @param path The path of the key
     * @returns Bulk String, specifically the stringified new value.
     */
    RejsonCommander.prototype.numincrby = function (key, number, path) {
        var args = [key];
        if (path !== undefined)
            args.push(path);
        args.push("".concat(number));
        return {
            command: 'JSON.NUMINCRBY',
            args: args
        };
    };
    /**
     * Multiplying JSON key value by number
     * @param key The name of the key
     * @param number The number to multiply by
     * @param path The path of the key
     * @returns Bulk String, specifically the stringified new value.
     */
    RejsonCommander.prototype.nummultby = function (key, number, path) {
        var args = [key];
        if (path !== undefined)
            args.push(path);
        args.push("".concat(number));
        return {
            command: 'JSON.NUMMULTBY',
            args: args
        };
    };
    /**
     * Appending string to JSON key string value
     * @param key The name of the key
     * @param string The string to append to key value
     * @param path The path of the key
     * @returns Integer, specifically the string's new length.
     */
    RejsonCommander.prototype.strappend = function (key, string, path) {
        var args = [key];
        if (path !== undefined)
            args.push(path);
        return {
            command: 'JSON.STRAPPEND',
            args: args.concat(string)
        };
    };
    /**
     * Retrieving the length of a JSON key value
     * @param key The name of the key
     * @param path The path of the key
     * @returns Integer, specifically the string's length.
     */
    RejsonCommander.prototype.strlen = function (key, path) {
        var args = [key];
        if (path !== undefined)
            args.push(path);
        return {
            command: 'JSON.STRLEN',
            args: args
        };
    };
    /**
     * Appending string to JSON key array value
     * @param key The name of the key
     * @param items The items to append to an existing JSON array
     * @param path The path of the key
     * @returns Integer, specifically the array's new size.
     */
    RejsonCommander.prototype.arrappend = function (key, items, path) {
        var args = [key];
        if (path !== undefined)
            args.push(path);
        return {
            command: 'JSON.ARRAPPEND',
            args: args.concat(items)
        };
    };
    /**
     * Retrieving JSON key array item by index
     * @param key The name of the key
     * @param scalar The scalar to filter out a JSON key
     * @param path The path of the key
     * @returns Integer, specifically the position of the scalar value in the array, or -1 if unfound.
     */
    RejsonCommander.prototype.arrindex = function (key, scalar, path) {
        var args = [key];
        if (path !== undefined)
            args.push(path);
        args.push(scalar);
        return {
            command: 'JSON.ARRINDEX',
            args: args
        };
    };
    /**
     * Inserting item into JSON key array
     * @param key The name of the key
     * @param index The index to insert the JSON into the array
     * @param json The JSON string to insert into the array
     * @param path The path of the key
     * @returns Integer, specifically the array's new size.
     */
    RejsonCommander.prototype.arrinsert = function (key, index, json, path) {
        var args = [key];
        if (path !== undefined)
            args.push(path);
        args = args.concat(["".concat(index), "".concat(json)]);
        return {
            command: 'JSON.ARRINSERT',
            args: args
        };
    };
    /**
     * Retrieving the length of a JSON key array
     * @param key The name of the key
     * @param path The path of the key
     * @returns Integer, specifically the array's length.
     */
    RejsonCommander.prototype.arrlen = function (key, path) {
        var args = [key];
        if (path !== undefined)
            args.push(path);
        return {
            command: 'JSON.ARRLEN',
            args: args
        };
    };
    /**
     * Poping an array item by index
     * @param key The name of the key
     * @param index The index of the array item to pop
     * @param path The path of the key
     * @returns Bulk String, specifically the popped JSON value.
     */
    RejsonCommander.prototype.arrpop = function (key, index, path) {
        var args = [key];
        if (path !== undefined)
            args.push(path);
        args.push("".concat(index));
        return {
            command: 'JSON.ARRPOP',
            args: args
        };
    };
    /**
     * Triming an array by index range
     * @param key The name of the key
     * @param start The starting index of the trim
     * @param end The ending index of the trim
     * @param path The path of the key
     * @returns Integer, specifically the array's new size.
     */
    RejsonCommander.prototype.arrtrim = function (key, start, end, path) {
        var args = [key];
        if (path !== undefined)
            args.push(path);
        args = args.concat(["".concat(start), "".concat(end)]);
        return {
            command: 'JSON.ARRTRIM',
            args: args
        };
    };
    /**
     * Retrieving an array of JSON keys
     * @param key The name of the key
     * @param path The path of the key
     * @returns Array, specifically the key names in the object as Bulk Strings.
     */
    RejsonCommander.prototype.objkeys = function (key, path) {
        var args = [key];
        if (path !== undefined)
            args.push(path);
        return {
            command: 'JSON.OBJKEYS',
            args: args
        };
    };
    /**
     * Retrieving the length of a JSON
     * @param key The name of the key
     * @param path The path of the key
     * @returns Integer, specifically the number of keys in the object.
     */
    RejsonCommander.prototype.objlen = function (key, path) {
        var args = [key];
        if (path !== undefined)
            args.push(path);
        return {
            command: 'JSON.OBJLEN',
            args: args
        };
    };
    /**
     * Executing debug command
     * @param subcommand The subcommand of the debug command
     * @param key The name of the key
     * @param path The path of the key
     * @returns
        MEMORY returns an integer, specifically the size in bytes of the value
        HELP returns an array, specifically with the help message
     */
    RejsonCommander.prototype.debug = function (subcommand, key, path) {
        var args = [subcommand];
        if (subcommand === 'MEMORY') {
            if (key !== undefined)
                args.push(key);
            if (path !== undefined)
                args.push(path);
        }
        return {
            command: 'JSON.DEBUG',
            args: args
        };
    };
    /**
     * An alias of delCommand
     * @param key The name of the key
     * @param path The path of the key
     * @returns The number of paths deleted (0 or 1).
     */
    RejsonCommander.prototype.forget = function (key, path) {
        var parameters = [key];
        if (path !== undefined)
            parameters.push(path);
        return {
            command: 'JSON.FORGET',
            args: parameters
        };
    };
    /**
     * Retrieving a JSON key value in RESP protocol
     * @param key The name of the key
     * @param path The path of the key
     * @returns Array, specifically the JSON's RESP form as detailed.
     */
    RejsonCommander.prototype.resp = function (key, path) {
        var parameters = [key];
        if (path !== undefined)
            parameters.push(path);
        return {
            command: 'JSON.RESP',
            args: parameters
        };
    };
    return RejsonCommander;
}());
exports.RejsonCommander = RejsonCommander;
