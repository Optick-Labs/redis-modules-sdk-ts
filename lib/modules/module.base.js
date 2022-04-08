"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = exports.log = exports.Module = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var IORedis = __importStar(require("ioredis"));
var Module = /** @class */ (function () {
    function Module(name, options, moduleOptions, clusterOptions) {
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
    Module.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.clusterNodes) {
                    this.cluster = new IORedis.Cluster(this.clusterNodes, this.clusterOptions);
                }
                else {
                    this.redis = new IORedis.default(this.redisOptions);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Disconnecting from the Redis database with the module
     */
    Module.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.clusterNodes) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.cluster.quit()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.redis.quit()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Running a Redis command
     * @param command The redis command
     * @param args The args of the redis command
     */
    Module.prototype.sendCommand = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        if (this.showDebugLogs) {
                            console.log("".concat(this.name, ": Running command ").concat(data.command, " with arguments: ").concat(data.args));
                        }
                        if (!this.clusterNodes) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.cluster.cluster.call(data.command, data.args)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.redis.sendCommand(new IORedis.Command(data.command, data.args))];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        response = _a;
                        if (this.showDebugLogs) {
                            console.log("".concat(this.name, ": command ").concat(data.command, " responded with ").concat(response));
                        }
                        return [2 /*return*/, response];
                    case 5:
                        error_1 = _b.sent();
                        return [2 /*return*/, this.handleError("".concat(this.name, " class (").concat(data.command.split(' ')[0], "): ").concat(error_1))];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handling a error
     * @param module The name of the module
     * @param error The message of the error
     */
    Module.prototype.handleError = function (error) {
        if (this.isHandleError)
            throw new Error(error);
        return error;
    };
    /**
     * Simpilizing the response of the Module command
     * @param response The array response from the module
     * @param isSearchQuery If we should try to build search result object from result array (default: false)
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    Module.prototype.handleResponse = function (response) {
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
        var obj = {};
        //If is an array/obj we will build it
        for (var i = 0; i < response.length; i += 2) {
            if (response[i + 1] !== '' && response[i + 1] !== undefined) {
                if (Array.isArray(response[i + 1]) && this.isOnlyTwoDimensionalArray(response[i + 1])) {
                    obj[response[i]] = this.reduceArrayDimension(response[i + 1]);
                    continue;
                }
                var value = (Array.isArray(response[i + 1]) ? this.handleResponse(response[i + 1]) : response[i + 1]);
                obj[response[i]] = value;
            }
        }
        return obj;
    };
    /**
     * Check if array is fully two dimensional. Only items in the array are arrays.
     * @param array The potential two dimensional array
     */
    Module.prototype.isOnlyTwoDimensionalArray = function (array) {
        return array.filter(function (item) { return Array.isArray(item); }).length === array.length;
    };
    /**
     * Reducing an array by one level. i.e. from two dimensional to 1 dimensional.
     * @param array The potentional two dimensional array
     */
    Module.prototype.reduceArrayDimension = function (array) {
        var newArray = [];
        array.forEach(function (singleArr) {
            newArray = newArray.concat(singleArr);
        });
        return newArray;
    };
    /**
     * Formatting given param value to string
     * @param paramValue The given param value
     * @returns A param value converted to string
     */
    Module.prototype.paramToString = function (paramValue) {
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
    return Module;
}());
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
