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
exports.RedisBloomCuckoo = void 0;
const module_base_1 = require("../module.base");
const redisbloom_cuckoo_commander_1 = require("./redisbloom-cuckoo.commander");
class RedisBloomCuckoo extends module_base_1.Module {
    constructor(options, moduleOptions, clusterOptions) {
        super(RedisBloomCuckoo.name, options, moduleOptions, clusterOptions);
        this.bloomCuckooCommander = new redisbloom_cuckoo_commander_1.BloomCuckooCommander();
    }
    /**
     * Creating an empty Bloom Cuckoo filter with a given initial capacity.
     * @param key The key under which the filter is to be found
     * @param capacity The number of entries you intend to add to the filter. Performance will begin to degrade after adding more items than this number. The actual degradation will depend on how far the limit has been exceeded. Performance will degrade linearly as the number of entries grow exponentially.
     * @param options The additional optional parameters
     */
    reserve(key, capacity, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomCuckooCommander.reserve(key, capacity, options);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Adding an item to the cuckoo filter, creating the filter if it does not exist.
     * @param key The name of the filter
     * @param item The item to add
     */
    add(key, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomCuckooCommander.add(key, item);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Adding an item to a cuckoo filter if the item did not exist previously.
     * @param key The name of the filter
     * @param item The item to add
     */
    addnx(key, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomCuckooCommander.addnx(key, item);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Adding one or more items to a cuckoo filter, allowing the filter to be created with a custom capacity if it does not yet exist.
     * @param key The name of the filter
     * @param items Begin the list of items to add
     * @param options The additional optional parameters of the 'CF.INSERT' command
     */
    insert(key, items, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomCuckooCommander.insert(key, items, options);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Adding one or more items to a cuckoo filter, allowing the filter to be created with a custom capacity if it does not yet exist.
     * @param key The name of the filter
     * @param items The items of the 'CF.INSERT' command
     * @param options The additional optional parameters of the 'CF.INSERTNX' command
     */
    insertnx(key, items, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomCuckooCommander.insertnx(key, items, options);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Determining whether an item may exist in the Cuckoo Filter or not.
     * @param key The name of the filter
     * @param item The item to check for
     */
    exists(key, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomCuckooCommander.exists(key, item);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Deleting an item once from the filter. If the item exists only once, it will be removed from the filter.
     * @param key The name of the filter
     * @param item The item to delete from the filter
     */
    del(key, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomCuckooCommander.del(key, item);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Returning the number of times an item may be in the filter.
     * @param key The name of the filter
     * @param item The item to count
     */
    count(key, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomCuckooCommander.count(key, item);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Begining an incremental save of the Cuckoo filter
     * @param key The name of the filter
     * @param iterator Iterator value. This is either 0, or the iterator from a previous invocation of this command
     */
    scandump(key, iterator) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomCuckooCommander.scandump(key, iterator);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Restoring a filter previously saved using SCANDUMP.
     * @param key The name of the key to restore
     * @param iterator The iterator value associated with data (returned by SCANDUMP )
     * @param data The current data chunk (returned by SCANDUMP )
     */
    loadchunk(key, iterator, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomCuckooCommander.loadchunk(key, iterator, data);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Returning information about a key
     * @param key The name of the filter
     */
    info(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomCuckooCommander.info(key);
            return yield this.sendCommand(command);
        });
    }
}
exports.RedisBloomCuckoo = RedisBloomCuckoo;
