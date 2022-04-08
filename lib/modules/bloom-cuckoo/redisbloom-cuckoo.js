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
exports.RedisBloomCuckoo = void 0;
var module_base_1 = require("../module.base");
var redisbloom_cuckoo_commander_1 = require("./redisbloom-cuckoo.commander");
var RedisBloomCuckoo = /** @class */ (function (_super) {
    __extends(RedisBloomCuckoo, _super);
    function RedisBloomCuckoo(options, moduleOptions, clusterOptions) {
        var _this = _super.call(this, RedisBloomCuckoo.name, options, moduleOptions, clusterOptions) || this;
        _this.bloomCuckooCommander = new redisbloom_cuckoo_commander_1.BloomCuckooCommander();
        return _this;
    }
    /**
     * Creating an empty Bloom Cuckoo filter with a given initial capacity.
     * @param key The key under which the filter is to be found
     * @param capacity The number of entries you intend to add to the filter. Performance will begin to degrade after adding more items than this number. The actual degradation will depend on how far the limit has been exceeded. Performance will degrade linearly as the number of entries grow exponentially.
     * @param options The additional optional parameters
     */
    RedisBloomCuckoo.prototype.reserve = function (key, capacity, options) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomCuckooCommander.reserve(key, capacity, options);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Adding an item to the cuckoo filter, creating the filter if it does not exist.
     * @param key The name of the filter
     * @param item The item to add
     */
    RedisBloomCuckoo.prototype.add = function (key, item) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomCuckooCommander.add(key, item);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Adding an item to a cuckoo filter if the item did not exist previously.
     * @param key The name of the filter
     * @param item The item to add
     */
    RedisBloomCuckoo.prototype.addnx = function (key, item) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomCuckooCommander.addnx(key, item);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Adding one or more items to a cuckoo filter, allowing the filter to be created with a custom capacity if it does not yet exist.
     * @param key The name of the filter
     * @param items Begin the list of items to add
     * @param options The additional optional parameters of the 'CF.INSERT' command
     */
    RedisBloomCuckoo.prototype.insert = function (key, items, options) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomCuckooCommander.insert(key, items, options);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Adding one or more items to a cuckoo filter, allowing the filter to be created with a custom capacity if it does not yet exist.
     * @param key The name of the filter
     * @param items The items of the 'CF.INSERT' command
     * @param options The additional optional parameters of the 'CF.INSERTNX' command
     */
    RedisBloomCuckoo.prototype.insertnx = function (key, items, options) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomCuckooCommander.insertnx(key, items, options);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Determining whether an item may exist in the Cuckoo Filter or not.
     * @param key The name of the filter
     * @param item The item to check for
     */
    RedisBloomCuckoo.prototype.exists = function (key, item) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomCuckooCommander.exists(key, item);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Deleting an item once from the filter. If the item exists only once, it will be removed from the filter.
     * @param key The name of the filter
     * @param item The item to delete from the filter
     */
    RedisBloomCuckoo.prototype.del = function (key, item) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomCuckooCommander.del(key, item);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returning the number of times an item may be in the filter.
     * @param key The name of the filter
     * @param item The item to count
     */
    RedisBloomCuckoo.prototype.count = function (key, item) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomCuckooCommander.count(key, item);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Begining an incremental save of the Cuckoo filter
     * @param key The name of the filter
     * @param iterator Iterator value. This is either 0, or the iterator from a previous invocation of this command
     */
    RedisBloomCuckoo.prototype.scandump = function (key, iterator) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomCuckooCommander.scandump(key, iterator);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Restoring a filter previously saved using SCANDUMP.
     * @param key The name of the key to restore
     * @param iterator The iterator value associated with data (returned by SCANDUMP )
     * @param data The current data chunk (returned by SCANDUMP )
     */
    RedisBloomCuckoo.prototype.loadchunk = function (key, iterator, data) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomCuckooCommander.loadchunk(key, iterator, data);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returning information about a key
     * @param key The name of the filter
     */
    RedisBloomCuckoo.prototype.info = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomCuckooCommander.info(key);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return RedisBloomCuckoo;
}(module_base_1.Module));
exports.RedisBloomCuckoo = RedisBloomCuckoo;
