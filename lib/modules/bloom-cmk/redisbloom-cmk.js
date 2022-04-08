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
exports.RedisBloomCMK = void 0;
var module_base_1 = require("../module.base");
var redisbloom_cmk_commander_1 = require("./redisbloom-cmk.commander");
var RedisBloomCMK = /** @class */ (function (_super) {
    __extends(RedisBloomCMK, _super);
    function RedisBloomCMK(options, moduleOptions, clusterOptions) {
        var _this = _super.call(this, RedisBloomCMK.name, options, moduleOptions, clusterOptions) || this;
        _this.bloomCmkCommander = new redisbloom_cmk_commander_1.BloomCmkCommander();
        return _this;
    }
    /**
     * Initializes a Count-Min Sketch to dimensions specified by user.
     * @param key The name of the sketch.
     * @param width The number of counter in each array. Reduces the error size.
     * @param depth The number of counter-arrays. Reduces the probability for an error of a certain size (percentage of total count).
     */
    RedisBloomCMK.prototype.initbydim = function (key, width, depth) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomCmkCommander.initbydim(key, width, depth);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Initializes a Count-Min Sketch to accommodate requested capacity.
     * @param key The name of the sketch.
     * @param errorSize Estimate size of error. The error is a percent of total counted items. This effects the width of the sketch.
     * @param probability The desired probability for inflated count.
     */
    RedisBloomCMK.prototype.initbyprob = function (key, errorSize, probability) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomCmkCommander.initbyprob(key, errorSize, probability);
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
    RedisBloomCMK.prototype.incrby = function (key, items) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomCmkCommander.incrby(key, items);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns count for item's.
     * @param key The name of the sketch.
     * @param items A list of items.
     */
    RedisBloomCMK.prototype.query = function (key, items) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomCmkCommander.query(key, items);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Merges several sketches into one sketch.
     * @param dest The name of destination sketch.
     * @param numKeys The number of sketches to be merged.
     * @param sources The names of source sketches to be merged.
     * @param weights A multiple of each sketch. Default =1.
     */
    RedisBloomCMK.prototype.merge = function (dest, numKeys, sources, weights) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomCmkCommander.merge(dest, numKeys, sources, weights);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returning information about a key
     * @param key The key of the 'CMS.INFO' command
     */
    RedisBloomCMK.prototype.info = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.bloomCmkCommander.info(key);
                        return [4 /*yield*/, this.sendCommand(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return RedisBloomCMK;
}(module_base_1.Module));
exports.RedisBloomCMK = RedisBloomCMK;
