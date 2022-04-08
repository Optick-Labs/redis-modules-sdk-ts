"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = exports.log = exports.Module = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const IORedis = require("ioredis");
class Module {
    constructor(name, options, moduleOptions, clusterOptions) {
        this.name = name;
        //If it's a list of cluster nodes
        if (Array.isArray(options)) {
            this.clusterNodes = options;
        }
        else {
            this.redisOptions = options;
        }
        this.isHandleError = moduleOptions && moduleOptions.isHandleError ? moduleOptions.isHandleError : true;
        this.showDebugLogs = moduleOptions && moduleOptions.showDebugLogs ? moduleOptions.showDebugLogs : false;
        this.returnRawResponse = (moduleOptions === null || moduleOptions === void 0 ? void 0 : moduleOptions.returnRawResponse) ? moduleOptions.returnRawResponse : false;
        this.clusterOptions = clusterOptions ? clusterOptions : undefined;
    }
    /**
     * Connecting to the Redis database with the module
     */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.clusterNodes) {
                this.cluster = new IORedis.Cluster(this.clusterNodes, this.clusterOptions);
            }
            else {
                this.redis = new IORedis.default(this.redisOptions);
            }
        });
    }
    /**
     * Disconnecting from the Redis database with the module
     */
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.clusterNodes) {
                yield this.cluster.quit();
            }
            else {
                yield this.redis.quit();
            }
        });
    }
    /**
     * Running a Redis command
     * @param command The redis command
     * @param args The args of the redis command
     */
    sendCommand(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.showDebugLogs) {
                    console.log(`${this.name}: Running command ${data.command} with arguments: ${data.args}`);
                }
                const response = this.clusterNodes ?
                    yield this.cluster.cluster.call(data.command, data.args)
                    : yield this.redis.sendCommand(new IORedis.Command(data.command, data.args));
                if (this.showDebugLogs) {
                    console.log(`${this.name}: command ${data.command} responded with ${response}`);
                }
                return response;
            }
            catch (error) {
                return this.handleError(`${this.name} class (${data.command.split(' ')[0]}): ${error}`);
            }
        });
    }
    /**
     * Handling a error
     * @param module The name of the module
     * @param error The message of the error
     */
    handleError(error) {
        if (this.isHandleError)
            throw new Error(error);
        return error;
    }
    /**
     * Simpilizing the response of the Module command
     * @param response The array response from the module
     * @param isSearchQuery If we should try to build search result object from result array (default: false)
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleResponse(response) {
        if (this.returnRawResponse === true) {
            return response;
        }
        //If not an array/object
        if ((typeof response === 'string' ||
            typeof response === 'number' ||
            (Array.isArray(response) && response.length % 2 === 1 && response.length > 1 && !this.isOnlyTwoDimensionalArray(response)) ||
            (Array.isArray(response) && response.length === 0))) {
            return response;
        }
        else if (Array.isArray(response) && response.length === 1) {
            return this.handleResponse(response[0]);
        }
        else if (Array.isArray(response) && response.length > 1 && this.isOnlyTwoDimensionalArray(response)) {
            return this.handleResponse(this.reduceArrayDimension(response));
        }
        const obj = {};
        //If is an array/obj we will build it
        for (let i = 0; i < response.length; i += 2) {
            if (response[i + 1] !== '' && response[i + 1] !== undefined) {
                if (Array.isArray(response[i + 1]) && this.isOnlyTwoDimensionalArray(response[i + 1])) {
                    obj[response[i]] = this.reduceArrayDimension(response[i + 1]);
                    continue;
                }
                const value = (Array.isArray(response[i + 1]) ? this.handleResponse(response[i + 1]) : response[i + 1]);
                obj[response[i]] = value;
            }
        }
        return obj;
    }
    /**
     * Check if array is fully two dimensional. Only items in the array are arrays.
     * @param array The potential two dimensional array
     */
    isOnlyTwoDimensionalArray(array) {
        return array.filter(item => Array.isArray(item)).length === array.length;
    }
    /**
     * Reducing an array by one level. i.e. from two dimensional to 1 dimensional.
     * @param array The potentional two dimensional array
     */
    reduceArrayDimension(array) {
        let newArray = [];
        array.forEach(singleArr => {
            newArray = newArray.concat(singleArr);
        });
        return newArray;
    }
    /**
     * Formatting given param value to string
     * @param paramValue The given param value
     * @returns A param value converted to string
     */
    paramToString(paramValue) {
        if (paramValue == null)
            return 'null';
        const paramType = typeof paramValue;
        if (paramType == 'string') {
            let strValue = "";
            paramValue = paramValue.replace(/[\\"']/g, '\\$&');
            if (paramValue[0] != '"')
                strValue += "'";
            strValue += paramValue;
            if (!paramValue.endsWith('"') || paramValue.endsWith("\\\""))
                strValue += "'";
            return strValue;
        }
        if (Array.isArray(paramValue)) {
            const stringsArr = new Array(paramValue.length);
            for (let i = 0; i < paramValue.length; i++) {
                stringsArr[i] = this.paramToString(paramValue[i]);
            }
            return ["[", stringsArr.join(", "), "]"].join("");
        }
        return paramValue;
    }
}
exports.Module = Module;
/**
 * Logging a message
 * @param level The level of the log
 * @param msg The log message
 */
function log(level, msg) {
    if (level === LogLevel.DEBUG && this.showDebugLogs === true) {
        console.debug(msg);
    }
    else if (level === LogLevel.Error) {
        throw new Error(msg);
    }
    else {
        console.log(msg);
    }
}
exports.log = log;
/**
 * Enum representing the log levels
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["INFO"] = 0] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["Error"] = 2] = "Error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
