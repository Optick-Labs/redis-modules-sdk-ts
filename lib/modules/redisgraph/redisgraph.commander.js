"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphCommander = void 0;
var GraphCommander = /** @class */ (function () {
    function GraphCommander() {
    }
    /**
     * Executing the given query against a specific graph
     * @param name The name of the graph
     * @param query The query to execute
     * @param params The params of the query
     * @returns Result set
     */
    GraphCommander.prototype.query = function (name, query, params) {
        var args = [name];
        args = args.concat(this.buildQueryCommand(query, params));
        return {
            command: 'GRAPH.QUERY',
            args: args
        };
    };
    /**
     * Executing the given readonly query against a specific graph
     * @param name The name of the graph
     * @param query The query to execute
     * @param params The params of the query
     * @returns Result set
     */
    GraphCommander.prototype.readonlyQuery = function (name, query, params) {
        var args = [name];
        args = args.concat(this.buildQueryCommand(query, params));
        var queryList = [];
        if (params !== undefined) {
            queryList.push('CYPHER');
            for (var key in params) {
                var value = this.paramToString(params[key]);
                queryList.push("".concat(key, "=").concat(value));
            }
            args.push("".concat(queryList.join(' '), " ").concat(query));
        }
        else
            args.push(query);
        return {
            command: 'GRAPH.RO_QUERY',
            args: args
        };
    };
    /**
     * Building the cypher params of a query
     * @param query The query
     * @param params The params of the query
     * @returns Returning an array of arguments
     */
    GraphCommander.prototype.buildQueryCommand = function (query, params) {
        var args = [];
        var queryList = [];
        if (params !== undefined) {
            queryList.push('CYPHER');
            for (var key in params) {
                var value = this.paramToString(params[key]);
                queryList.push("".concat(key, "=").concat(value));
            }
            args.push("".concat(queryList.join(' '), " ").concat(query));
        }
        else
            args.push(query);
        return args;
    };
    /**
     * Executing a query and produces an execution plan augmented with metrics for each operation's execution
     * @param name The name of the graph
     * @param query The query to execute
     * @returns String representation of a query execution plan, with details on results produced by and time spent in each operation.
     */
    GraphCommander.prototype.profile = function (name, query) {
        return {
            command: 'GRAPH.PROFILE',
            args: [name, query]
        };
    };
    /**
     * Completely removing the graph and all of its entities
     * @param name The name of the graph
     * @returns String indicating if operation succeeded or failed.
     */
    GraphCommander.prototype.delete = function (name) {
        return {
            command: 'GRAPH.DELETE',
            args: [name]
        };
    };
    /**
     * Constructing a query execution plan but does not run it. Inspect this execution plan to better understand how your query will get executed
     * @param name The name of the graph
     * @param query The query to execute
     * @returns String representation of a query execution plan
     */
    GraphCommander.prototype.explain = function (name, query) {
        return {
            command: 'GRAPH.EXPLAIN',
            args: [name, query]
        };
    };
    /**
     * Retrieving a list containing up to 10 of the slowest queries
     * @param id The id of the graph
     * @returns A list containing up to 10 of the slowest queries issued against the given graph ID.
     */
    GraphCommander.prototype.slowlog = function (id) {
        return {
            command: 'GRAPH.SLOWLOG',
            args: [id]
        };
    };
    /**
     * Retrieves, describes and sets runtime configuration options
     * @param command The command type
     * @param option The option
     * @param value In case of 'SET' command, a valid value to set
     * @returns If 'SET' command, returns 'OK' for valid runtime-settable option names and values. If 'GET' command, returns a string with the current option's value.
     */
    GraphCommander.prototype.config = function (command, option, value) {
        var args = [command, option];
        if (command === 'SET') {
            args.push(value);
        }
        return {
            command: 'GRAPH.CONFIG',
            args: args
        };
    };
    /**
     * Formatting given param value to string
     * @param paramValue The given param value
     * @returns A param value converted to string
     */
    GraphCommander.prototype.paramToString = function (paramValue) {
        if (paramValue == null)
            return 'null';
        var paramType = typeof paramValue;
        if (paramType == 'string') {
            var strValue = "";
            paramValue = paramValue.replace(/[\\"']/g, '\\$&');
            if (paramValue[0] != '"')
                strValue += "'";
            strValue += paramValue;
            if (!paramValue.endsWith('"') || paramValue.endsWith("\\\""))
                strValue += "'";
            return strValue;
        }
        if (Array.isArray(paramValue)) {
            var stringsArr = new Array(paramValue.length);
            for (var i = 0; i < paramValue.length; i++) {
                stringsArr[i] = this.paramToString(paramValue[i]);
            }
            return ["[", stringsArr.join(", "), "]"].join("");
        }
        return paramValue;
    };
    return GraphCommander;
}());
exports.GraphCommander = GraphCommander;
