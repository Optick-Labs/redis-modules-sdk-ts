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
exports.RedisBloomTopK = void 0;
const module_base_1 = require("../module.base");
const redisbloom_topk_commander_1 = require("./redisbloom-topk.commander");
class RedisBloomTopK extends module_base_1.Module {
    constructor(options, moduleOptions, clusterOptions) {
        super(RedisBloomTopK.name, options, moduleOptions, clusterOptions);
        this.bloomTopkCommander = new redisbloom_topk_commander_1.BloomTopkCommander();
    }
    /**
     * Initializing a TopK with specified parameters
     * @param key The key under which the sketch is to be found.
     * @param topk The number of top occurring items to keep.
     * @param width The number of counters kept in each array.
     * @param depth The number of arrays.
     * @param decay The probability of reducing a counter in an occupied bucket. It is raised to power of it's counter (decay ^ bucket[i].counter). Therefore, as the counter gets higher, the chance of a reduction is being reduced.
     */
    reserve(key, topk, width, depth, decay) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomTopkCommander.reserve(key, topk, width, depth, decay);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Adding an item to the data structure.
     * @param key Name of sketch where item is added.
     * @param items Item/s to be added.
     */
    add(key, items) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomTopkCommander.add(key, items);
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
            const command = this.bloomTopkCommander.incrby(key, items);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Checking whether an item is one of Top-K items.
     * @param key Name of sketch where item is queried.
     * @param items Item/s to be queried.
     */
    query(key, items) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomTopkCommander.query(key, items);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Returning count for an item.
     * @param key Name of sketch where item is counted.
     * @param items Item/s to be counted.
     */
    count(key, items) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomTopkCommander.count(key, items);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Returning full list of items in Top K list.
     * @param key Name of sketch where item is counted.
     */
    list(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomTopkCommander.list(key);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Returning information about a key
     * @param key Name of sketch.
     */
    info(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomTopkCommander.info(key);
            return yield this.sendCommand(command);
        });
    }
}
exports.RedisBloomTopK = RedisBloomTopK;
