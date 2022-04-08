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
exports.RedisBloomTDigest = void 0;
var module_base_1 = require("../module.base");
var redisbloom_tdigest_commander_1 = require("./redisbloom-tdigest.commander");
var RedisBloomTDigest = /** @class */ (function (_super) {
    __extends(RedisBloomTDigest, _super);
    function RedisBloomTDigest(options, moduleOptions, clusterOptions) {
        var _this = _super.call(this, RedisBloomTDigest.name, options, moduleOptions, clusterOptions) || this;
        _this.bloomTdigestCommander = new redisbloom_tdigest_commander_1.BloomTdigestCommander();
        return _this;
    }
    /**
     * Allocate the memory and initialize the t-digest
     * @param key The name of the sketch
     * @param compression The compression parameter. 100 is a common value for normal uses. 1000 is extremely large. See the further notes bellow.
     * @returns OK on success, error otherwise
     */
    RedisBloomTDigest.prototype.create = function (key, compression) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomTdigestCommander.create(key, compression);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Reset the sketch to zero - empty out the sketch and re-initialize it
     * @param key The name of the sketch
     * @returns OK on success, error otherwise
     */
    RedisBloomTDigest.prototype.reset = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomTdigestCommander.reset(key);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Adds one or more samples to a sketch
     * @param key The name of the sketch
     * @param parameters The parameters of the command
     * @returns OK on success, error otherwise
     */
    RedisBloomTDigest.prototype.add = function (key, parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomTdigestCommander.add(key, parameters);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Merges all of the values from 'from' to 'this' sketch
     * @param fromKey Sketch to copy values to
     * @param toKey Sketch to copy values from
     * @returns OK on success, error otherwise
     */
    RedisBloomTDigest.prototype.merge = function (fromKey, toKey) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomTdigestCommander.merge(fromKey, toKey);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get minimum value from the sketch. Will return DBL_MAX if the sketch is empty
     * @param key The name of the sketch
     * @returns DBL_MAX if the sketch is empty
     */
    RedisBloomTDigest.prototype.min = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomTdigestCommander.min(key);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get maximum value from the sketch. Will return DBL_MIN if the sketch is empty
     * @param key The name of the sketch
     * @returns DBL_MIN if the sketch is empty
     */
    RedisBloomTDigest.prototype.max = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomTdigestCommander.max(key);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns an estimate of the cutoff such that a specified fraction of the data added to this TDigest would be less than or equal to the cutoff
     * @param key The name of the sketch
     * @param quantile The desired fraction ( between 0 and 1 inclusively )
     * @returns Double value estimate of the cutoff such that a specified fraction of the data added to this TDigest would be less than or equal to the cutoff
     */
    RedisBloomTDigest.prototype.quantile = function (key, quantile) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomTdigestCommander.quantile(key, quantile);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns the fraction of all points added which are <= value
     * @param key The name of the sketch
     * @param value Upper limit for which the fraction of all points added which are <= value
     * @returns Returns compression, capacity, total merged and unmerged nodes, the total compressions made up to date on that key, and merged and unmerged weight
     */
    RedisBloomTDigest.prototype.cdf = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomTdigestCommander.cdf(key, value);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns compression, capacity, total merged and unmerged nodes, the total compressions made up to date on that key, and merged and unmerged weight.
     * @param key The name of the sketch
     */
    RedisBloomTDigest.prototype.info = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomTdigestCommander.info(key);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    return RedisBloomTDigest;
}(module_base_1.Module));
exports.RedisBloomTDigest = RedisBloomTDigest;
