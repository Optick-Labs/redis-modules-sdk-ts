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
exports.Redisearch = void 0;
var module_base_1 = require("../module.base");
var redisearch_commander_1 = require("./redisearch.commander");
var redisearch_helpers_1 = require("./redisearch.helpers");
var Redisearch = /** @class */ (function (_super) {
    __extends(Redisearch, _super);
    function Redisearch(options, moduleOptions, clusterOptions) {
        var _this = _super.call(this, Redisearch.name, options, moduleOptions, clusterOptions) || this;
        _this.searchCommander = new redisearch_commander_1.SearchCommander();
        _this.searchHelpers = new redisearch_helpers_1.RedisearchHelpers();
        return _this;
    }
    /**
     * Creating an index with a given spec
     * @param index The index of the schema
     * @param indexType The index type of the schema
     * @param schemaFields The filter set after the 'SCHEMA' argument
     * @param parameters The additional parameters of the spec
     * @returns 'OK' or error
     */
    Redisearch.prototype.create = function (index, indexType, schemaFields, parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.create(index, indexType, schemaFields, parameters);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * Searching the index with a textual query
     * @param index The index
     * @param query The query
     * @param parameters The additional optional parameter
     * @returns Array reply, where the first element is the total number of results, and then pairs of document id, and a nested array of field/value.
     */
    Redisearch.prototype.search = function (index, query, parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.search(index, query, parameters);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        if (this.returnRawResponse === true) {
                            return [2 /*return*/, this.handleResponse(response)];
                        }
                        return [2 /*return*/, this.searchHelpers.handleQueryResponse(response)];
                }
            });
        });
    };
    /**
     * Runs a search query on an index, and performs aggregate transformations on the results, extracting statistics etc from them
     * @param index The index
     * @param query The query
     * @param parameters The additional optional parameters
     * @returns Array Response. Each row is an array and represents a single aggregate result
     */
    Redisearch.prototype.aggregate = function (index, query, parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.aggregate(index, query, parameters);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        if (this.returnRawResponse === true) {
                            return [2 /*return*/, this.handleResponse(response)];
                        }
                        return [2 /*return*/, this.searchHelpers.handleAggregateResponse(response)];
                }
            });
        });
    };
    /**
     * Retrieving the execution plan for a complex query
     * @param index The index
     * @param query The query
     * @returns Returns the execution plan for a complex query
     */
    Redisearch.prototype.explain = function (index, query) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.explain(index, query);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * Retrieving the execution plan for a complex query but formatted for easier reading without using redis-cli --raw
     * @param index The index
     * @param query The query
     * @returns A string representing the execution plan.
     */
    Redisearch.prototype.explainCLI = function (index, query) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.explainCLI(index, query);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response.join(''))];
                }
            });
        });
    };
    /**
     * Adding a new field to the index
     * @param index The index
     * @param field The field name
     * @param fieldType The field type
     * @param options The additional optional parameters
     * @returns 'OK' or error
     */
    Redisearch.prototype.alter = function (index, field, fieldType, options) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.alter(index, field, fieldType, options);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * Deleting the index
     * @param index The index
     * @param deleteHash If set, the drop operation will delete the actual document hashes.
     * @returns 'OK' or error
     */
    Redisearch.prototype.dropindex = function (index, deleteHash) {
        if (deleteHash === void 0) { deleteHash = false; }
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.dropindex(index, deleteHash);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * Adding alias fron an index
     * @param name The alias name
     * @param index The alias index
     * @returns 'OK' or error
     */
    Redisearch.prototype.aliasadd = function (name, index) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.aliasadd(name, index);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * Updating alias index
     * @param name The alias name
     * @param index The alias index
     * @returns 'OK' or error
     */
    Redisearch.prototype.aliasupdate = function (name, index) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.aliasupdate(name, index);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * Deleting alias fron an index
     * @param name The alias name
     * @returns 'OK' or error
     */
    Redisearch.prototype.aliasdel = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.aliasdel(name);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * Retrieving the distinct tags indexed in a Tag field
     * @param index The index
     * @param field The field name
     * @returns The distinct tags indexed in a Tag field
     */
    Redisearch.prototype.tagvals = function (index, field) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.tagvals(index, field);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * Adds a suggestion string to an auto-complete suggestion dictionary
     * @param key The key
     * @param suggestion The suggestion
     * @param score The score
     * @param options The additional optional parameters
     * @returns The current size of the suggestion dictionary
     */
    Redisearch.prototype.sugadd = function (key, suggestion, score, options) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.sugadd(key, suggestion, score, options);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * Retrieving completion suggestions for a prefix
     * @param key The key
     * @param prefix The prefix of the suggestion
     * @param options The additional optional parameter
     * @returns A list of the top suggestions matching the prefix, optionally with score after each entry
     */
    Redisearch.prototype.sugget = function (key, prefix, options) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.sugget(key, prefix, options);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * Deleting a string from a suggestion index
     * @param key The key
     * @param suggestion The suggestion
     */
    Redisearch.prototype.sugdel = function (key, suggestion) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.sugdel(key, suggestion);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * Retrieving the size of an auto-complete suggestion dictionary
     * @param key The key
     */
    Redisearch.prototype.suglen = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.suglen(key);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * Updating a synonym group
     * @param index The index
     * @param groupId The group id
     * @param terms A list of terms
     * @param skipInitialScan If set, we do not scan and index.
     * @returns 'OK'
     */
    Redisearch.prototype.synupdate = function (index, groupId, terms, skipInitialScan) {
        if (skipInitialScan === void 0) { skipInitialScan = false; }
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.synupdate(index, groupId, terms, skipInitialScan);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * Dumps the contents of a synonym group
     * @param index The index
     * @returns A list of synonym terms and their synonym group ids.
     */
    Redisearch.prototype.syndump = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.syndump(index);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * Performs spelling correction on a query
     * @param index The index
     * @param query The query
     * @param options The additional optional parameters
     * @returns An array, in which each element represents a misspelled term from the query
     */
    Redisearch.prototype.spellcheck = function (index, query, options) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.spellcheck(index, query, options);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.searchHelpers.handleSpellcheckResponse(response)];
                }
            });
        });
    };
    /**
     * Adding terms to a dictionary
     * @param dict The dictionary
     * @param terms A list of terms
     * @returns The number of new terms that were added
     */
    Redisearch.prototype.dictadd = function (dict, terms) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.dictadd(dict, terms);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * Deleting terms from a dictionary
     * @param dict The dictionary
     * @param terms A list of terms
     * @returns The number of terms that were deleted
     */
    Redisearch.prototype.dictdel = function (dict, terms) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.dictdel(dict, terms);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * Dumps all terms in the given dictionary
     * @param dict The dictionary
     * @returns An array, where each element is term
     */
    Redisearch.prototype.dictdump = function (dict) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.dictdump(dict);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * Retrieving infromation and statistics on the index
     * @param index The index
     * @returns A nested array of keys and values.
     */
    Redisearch.prototype.info = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.info(index);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * Retrieves, describes and sets runtime configuration options
     * @param commandType The command type
     * @param option The option
     * @param value In case of 'SET' command, a valid value to set
     * @returns If 'SET' command, returns 'OK' for valid runtime-settable option names and values. If 'GET' command, returns a string with the current option's value.
     */
    Redisearch.prototype.config = function (commandType, option, value) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.searchCommander.config(commandType, option, value);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    return Redisearch;
}(module_base_1.Module));
exports.Redisearch = Redisearch;
