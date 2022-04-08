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
exports.RedisBloomCMK = void 0;
const module_base_1 = require("../module.base");
const redisbloom_cmk_commander_1 = require("./redisbloom-cmk.commander");
class RedisBloomCMK extends module_base_1.Module {
    constructor(options, moduleOptions, clusterOptions) {
        super(RedisBloomCMK.name, options, moduleOptions, clusterOptions);
        this.bloomCmkCommander = new redisbloom_cmk_commander_1.BloomCmkCommander();
    }
    /**
     * Initializes a Count-Min Sketch to dimensions specified by user.
     * @param key The name of the sketch.
     * @param width The number of counter in each array. Reduces the error size.
     * @param depth The number of counter-arrays. Reduces the probability for an error of a certain size (percentage of total count).
     */
    initbydim(key, width, depth) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomCmkCommander.initbydim(key, width, depth);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Initializes a Count-Min Sketch to accommodate requested capacity.
     * @param key The name of the sketch.
     * @param errorSize Estimate size of error. The error is a percent of total counted items. This effects the width of the sketch.
     * @param probability The desired probability for inflated count.
     */
    initbyprob(key, errorSize, probability) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomCmkCommander.initbyprob(key, errorSize, probability);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Increases the count of item's by increment.
     * @param key The name of the sketch.
     * @param items A list of item and increment set's
     */
    incrby(key, items) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomCmkCommander.incrby(key, items);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Returns count for item's.
     * @param key The name of the sketch.
     * @param items A list of items.
     */
    query(key, items) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomCmkCommander.query(key, items);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Merges several sketches into one sketch.
     * @param dest The name of destination sketch.
     * @param numKeys The number of sketches to be merged.
     * @param sources The names of source sketches to be merged.
     * @param weights A multiple of each sketch. Default =1.
     */
    merge(dest, numKeys, sources, weights) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomCmkCommander.merge(dest, numKeys, sources, weights);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Returning information about a key
     * @param key The key of the 'CMS.INFO' command
     */
    info(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomCmkCommander.info(key);
            return yield this.sendCommand(command);
        });
    }
}
exports.RedisBloomCMK = RedisBloomCMK;
