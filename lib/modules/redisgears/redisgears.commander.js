"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GearsCommander = void 0;
var GearsCommander = /** @class */ (function () {
    function GearsCommander() {
    }
    /**
     * Aborting an existing execution
     * @param id The id of the execution
     */
    GearsCommander.prototype.abortExecution = function (id) {
        return {
            command: 'RG.ABORTEXECUTION',
            args: [id]
        };
    };
    /**
     * Retrieving key's configuration
     * @param key A list of keys
     */
    GearsCommander.prototype.configGet = function (key) {
        return {
            command: 'RG.CONFIGGET',
            args: [key]
        };
    };
    /**
     * Setting key's configuration
     * @param keyvalue A key value array, i.e. [['key', 'value]]
     */
    GearsCommander.prototype.configSet = function (keyvalues) {
        var args = [];
        for (var _i = 0, keyvalues_1 = keyvalues; _i < keyvalues_1.length; _i++) {
            var keyvalue = keyvalues_1[_i];
            args.concat(keyvalue);
        }
        return {
            command: 'RG.CONFIGSET',
            args: args
        };
    };
    /**
     * Dropping an existing execution
     * @param id The id of the execution
     */
    GearsCommander.prototype.dropExecution = function (id) {
        return {
            command: 'RG.DROPEXECUTION',
            args: [id]
        };
    };
    /**
     * Dumping all of the executions
     */
    GearsCommander.prototype.dumpExecutions = function () {
        return {
            command: 'RG.DUMPEXECUTIONS'
        };
    };
    /**
     * Dumping all of the registrations
     */
    GearsCommander.prototype.dumpRegistrations = function () {
        return {
            command: 'RG.DUMPREGISTRATIONS'
        };
    };
    /**
     * Retrieving an execution
     * @param id The id of the execution
     * @param options The additional optional parameters
     */
    GearsCommander.prototype.getExecution = function (id, options) {
        var args = [id.toString()];
        if (options !== undefined && options.shard === true)
            args.push('SHARD');
        if (options !== undefined && options.cluster === true)
            args.push('CLUSTER');
        return {
            command: 'RG.GETEXECUTION',
            args: args
        };
    };
    /**
     * Retrieving the results
     * @param id The id of the execution
     */
    GearsCommander.prototype.getResults = function (id) {
        return {
            command: 'RG.GETRESULTS',
            args: [id]
        };
    };
    /**
     * Retrieving the results that have 'UNBLOCKING' argument (And removing it)
     * @param id The id of the execution
     */
    GearsCommander.prototype.getResultsBlocking = function (id) {
        return {
            command: 'RG.GETRESULTSBLOCKING',
            args: [id]
        };
    };
    /**
     * Retrieving information about the cluster
     */
    GearsCommander.prototype.infocluster = function () {
        return {
            command: 'RG.INFOCLUSTER'
        };
    };
    /**
     * Executing a python function
     * @param func The function
     * @param options The additional optional arguments
     */
    GearsCommander.prototype.pyexecute = function (func, options) {
        var args = [func];
        if (options !== undefined && options.unblocking === true)
            args.push('UNBLOCKING');
        if (options !== undefined && options.requirements !== undefined)
            args.concat(['REQUIREMENTS'].concat(options.requirements));
        return {
            command: 'RG.PYEXECUTE',
            args: args
        };
    };
    /**
     * Retrieving memory usage statistics from the 'Python interpreter'
     */
    GearsCommander.prototype.pystats = function () {
        return {
            command: 'RG.PYSTATS'
        };
    };
    /**
     * Retrieving a list of all the python requirements available
     */
    GearsCommander.prototype.pydumpreqs = function () {
        return {
            command: 'RG.PYDUMPREQS'
        };
    };
    /**
     * Refreshing the node's view of the cluster's topology
     */
    GearsCommander.prototype.refreshCluster = function () {
        return {
            command: 'RG.REFRESHCLUSTER'
        };
    };
    /**
     * Triggering the execution of a registered 'CommandReader' function
     * @param trigger The trigger's name
     * @param args The additional arguments
     */
    GearsCommander.prototype.trigger = function (trigger, args) {
        return {
            command: 'RG.TRIGGER',
            args: [trigger].concat(args)
        };
    };
    /**
     * Removing the registration of a function
     * @param id The id of the execution
     */
    GearsCommander.prototype.unregister = function (id) {
        return {
            command: 'RG.UNREGISTER',
            args: [id]
        };
    };
    return GearsCommander;
}());
exports.GearsCommander = GearsCommander;
