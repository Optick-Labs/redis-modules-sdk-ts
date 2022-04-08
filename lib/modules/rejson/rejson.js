"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.ReJSON = void 0;
var module_base_1 = require("../module.base");
var rejson_commander_1 = require("./rejson.commander");
var ReJSON = /** @class */ (function (_super) {
    __extends(ReJSON, _super);
    function ReJSON(options, moduleOptions, clusterOptions) {
        var _this = _super.call(this, ReJSON.name, options, moduleOptions, clusterOptions) || this;
        _this.rejsonCommander = new rejson_commander_1.RejsonCommander();
        return _this;
    }
    /**
     * Deleting a JSON key
     * @param key The name of the key
     * @param path The path of the key defaults to root if not provided. Non-existing keys and paths are ignored. Deleting an object's root is equivalent to deleting the key from Redis.
     * @returns The number of paths deleted (0 or 1).
     */
    ReJSON.prototype.del = function (key, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.del(key, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Clearing a JSON key
     * @param key The name of the key
     * @param path The path of the key defaults to root if not provided. Non-existing keys and paths are ignored. Deleting an object's root is equivalent to deleting the key from Redis.
     * @returns The number of paths deleted (0 or 1).
     */
    ReJSON.prototype.clear = function (key, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.clear(key, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Toggling a JSON key
     * @param key The name of the key
     * @param path The path of the key defaults to root if not provided. Non-existing keys and paths are ignored. Deleting an object's root is equivalent to deleting the key from Redis.
     * @returns The value of the path after the toggle.
     */
    ReJSON.prototype.toggle = function (key, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.toggle(key, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Setting a new JSON key
     * @param key The name of the key
     * @param path The path of the key
     * @param json The JSON string of the key i.e. '{"x": 4}'
     * @param condition Optional. The condition to set the JSON in.
     * @returns Simple String OK if executed correctly, or Null Bulk if the specified NX or XX conditions were not met.
     */
    ReJSON.prototype.set = function (key, path, json, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.set(key, path, json, condition);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieving a JSON key
     * @param key The name of the key
     * @param path The path of the key
     * @param parameters Additional parameters to arrange the returned values
     * @returns The value at path in JSON serialized form.
     */
    ReJSON.prototype.get = function (key, path, parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.get(key, path, parameters);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieving values from multiple keys
     * @param keys A list of keys
     * @param path The path of the keys
     * @returns The values at path from multiple key's. Non-existing keys and non-existing paths are reported as null.
     */
    ReJSON.prototype.mget = function (keys, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.mget(keys, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieving the type of a JSON key
     * @param key The name of the key
     * @param path The path of the key
     * @returns Simple String, specifically the type of value.
     */
    ReJSON.prototype.type = function (key, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.type(key, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Increasing JSON key value by number
     * @param key The name of the key
     * @param number The number to increase by
     * @param path The path of the key
     * @returns Bulk String, specifically the stringified new value.
     */
    ReJSON.prototype.numincrby = function (key, number, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.numincrby(key, number, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Multiplying JSON key value by number
     * @param key The name of the key
     * @param number The number to multiply by
     * @param path The path of the key
     * @returns Bulk String, specifically the stringified new value.
     */
    ReJSON.prototype.nummultby = function (key, number, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.nummultby(key, number, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Appending string to JSON key string value
     * @param key The name of the key
     * @param string The string to append to key value
     * @param path The path of the key
     * @returns Integer, specifically the string's new length.
     */
    ReJSON.prototype.strappend = function (key, string, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.strappend(key, string, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieving the length of a JSON key value
     * @param key The name of the key
     * @param path The path of the key
     * @returns Integer, specifically the string's length.
     */
    ReJSON.prototype.strlen = function (key, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.strlen(key, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Appending string to JSON key array value
     * @param key The name of the key
     * @param items The items to append to an existing JSON array
     * @param path The path of the key
     * @returns Integer, specifically the array's new size.
     */
    ReJSON.prototype.arrappend = function (key, items, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.arrappend(key, items, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieving JSON key array item by index
     * @param key The name of the key
     * @param scalar The scalar to filter out a JSON key
     * @param path The path of the key
     * @returns Integer, specifically the position of the scalar value in the array, or -1 if unfound.
     */
    ReJSON.prototype.arrindex = function (key, scalar, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.arrindex(key, scalar, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Inserting item into JSON key array
     * @param key The name of the key
     * @param index The index to insert the JSON into the array
     * @param json The JSON string to insert into the array
     * @param path The path of the key
     * @returns Integer, specifically the array's new size.
     */
    ReJSON.prototype.arrinsert = function (key, index, json, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.arrinsert(key, index, json, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieving the length of a JSON key array
     * @param key The name of the key
     * @param path The path of the key
     * @returns Integer, specifically the array's length.
     */
    ReJSON.prototype.arrlen = function (key, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.arrlen(key, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Poping an array item by index
     * @param key The name of the key
     * @param index The index of the array item to pop
     * @param path The path of the key
     * @returns Bulk String, specifically the popped JSON value.
     */
    ReJSON.prototype.arrpop = function (key, index, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.arrpop(key, index, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Triming an array by index range
     * @param key The name of the key
     * @param start The starting index of the trim
     * @param end The ending index of the trim
     * @param path The path of the key
     * @returns Integer, specifically the array's new size.
     */
    ReJSON.prototype.arrtrim = function (key, start, end, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.arrtrim(key, start, end, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieving an array of JSON keys
     * @param key The name of the key
     * @param path The path of the key
     * @returns Array, specifically the key names in the object as Bulk Strings.
     */
    ReJSON.prototype.objkeys = function (key, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.objkeys(key, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieving the length of a JSON
     * @param key The name of the key
     * @param path The path of the key
     * @returns Integer, specifically the number of keys in the object.
     */
    ReJSON.prototype.objlen = function (key, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.objlen(key, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
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
    ReJSON.prototype.debug = function (subcommand, key, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.debug(subcommand, key, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * An alias of delCommand
     * @param key The name of the key
     * @param path The path of the key
     * @returns The number of paths deleted (0 or 1).
     */
    ReJSON.prototype.forget = function (key, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.forget(key, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieving a JSON key value in RESP protocol
     * @param key The name of the key
     * @param path The path of the key
     * @returns Array, specifically the JSON's RESP form as detailed.
     */
    ReJSON.prototype.resp = function (key, path) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.rejsonCommander.resp(key, path);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ReJSON;
}(module_base_1.Module));
exports.ReJSON = ReJSON;
