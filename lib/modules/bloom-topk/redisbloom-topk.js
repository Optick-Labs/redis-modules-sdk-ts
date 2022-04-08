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
exports.RedisBloomTopK = void 0;
var module_base_1 = require("../module.base");
var redisbloom_topk_commander_1 = require("./redisbloom-topk.commander");
var RedisBloomTopK = /** @class */ (function (_super) {
    __extends(RedisBloomTopK, _super);
    function RedisBloomTopK(options, moduleOptions, clusterOptions) {
        var _this = _super.call(this, RedisBloomTopK.name, options, moduleOptions, clusterOptions) || this;
        _this.bloomTopkCommander = new redisbloom_topk_commander_1.BloomTopkCommander();
        return _this;
    }
    /**
     * Initializing a TopK with specified parameters
     * @param key The key under which the sketch is to be found.
     * @param topk The number of top occurring items to keep.
     * @param width The number of counters kept in each array.
     * @param depth The number of arrays.
     * @param decay The probability of reducing a counter in an occupied bucket. It is raised to power of it's counter (decay ^ bucket[i].counter). Therefore, as the counter gets higher, the chance of a reduction is being reduced.
     */
    RedisBloomTopK.prototype.reserve = function (key, topk, width, depth, decay) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomTopkCommander.reserve(key, topk, width, depth, decay);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Adding an item to the data structure.
     * @param key Name of sketch where item is added.
     * @param items Item/s to be added.
     */
    RedisBloomTopK.prototype.add = function (key, items) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomTopkCommander.add(key, items);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Increases the count of item's by increment.
     * @param key The name of the sketch.
     * @param items A list of item and increment set's
     */
    RedisBloomTopK.prototype.incrby = function (key, items) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomTopkCommander.incrby(key, items);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Checking whether an item is one of Top-K items.
     * @param key Name of sketch where item is queried.
     * @param items Item/s to be queried.
     */
    RedisBloomTopK.prototype.query = function (key, items) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomTopkCommander.query(key, items);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returning count for an item.
     * @param key Name of sketch where item is counted.
     * @param items Item/s to be counted.
     */
    RedisBloomTopK.prototype.count = function (key, items) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomTopkCommander.count(key, items);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returning full list of items in Top K list.
     * @param key Name of sketch where item is counted.
     */
    RedisBloomTopK.prototype.list = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomTopkCommander.list(key);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returning information about a key
     * @param key Name of sketch.
     */
    RedisBloomTopK.prototype.info = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomTopkCommander.info(key);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return RedisBloomTopK;
}(module_base_1.Module));
exports.RedisBloomTopK = RedisBloomTopK;
