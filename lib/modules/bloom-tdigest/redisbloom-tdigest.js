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
exports.RedisBloomTDigest = void 0;
const module_base_1 = require("../module.base");
const redisbloom_tdigest_commander_1 = require("./redisbloom-tdigest.commander");
class RedisBloomTDigest extends module_base_1.Module {
    constructor(options, moduleOptions, clusterOptions) {
        super(RedisBloomTDigest.name, options, moduleOptions, clusterOptions);
        this.bloomTdigestCommander = new redisbloom_tdigest_commander_1.BloomTdigestCommander();
    }
    /**
     * Allocate the memory and initialize the t-digest
     * @param key The name of the sketch
     * @param compression The compression parameter. 100 is a common value for normal uses. 1000 is extremely large. See the further notes bellow.
     * @returns OK on success, error otherwise
     */
    create(key, compression) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomTdigestCommander.create(key, compression);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Reset the sketch to zero - empty out the sketch and re-initialize it
     * @param key The name of the sketch
     * @returns OK on success, error otherwise
     */
    reset(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomTdigestCommander.reset(key);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Adds one or more samples to a sketch
     * @param key The name of the sketch
     * @param parameters The parameters of the command
     * @returns OK on success, error otherwise
     */
    add(key, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomTdigestCommander.add(key, parameters);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Merges all of the values from 'from' to 'this' sketch
     * @param fromKey Sketch to copy values to
     * @param toKey Sketch to copy values from
     * @returns OK on success, error otherwise
     */
    merge(fromKey, toKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomTdigestCommander.merge(fromKey, toKey);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Get minimum value from the sketch. Will return DBL_MAX if the sketch is empty
     * @param key The name of the sketch
     * @returns DBL_MAX if the sketch is empty
     */
    min(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomTdigestCommander.min(key);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Get maximum value from the sketch. Will return DBL_MIN if the sketch is empty
     * @param key The name of the sketch
     * @returns DBL_MIN if the sketch is empty
     */
    max(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomTdigestCommander.max(key);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Returns an estimate of the cutoff such that a specified fraction of the data added to this TDigest would be less than or equal to the cutoff
     * @param key The name of the sketch
     * @param quantile The desired fraction ( between 0 and 1 inclusively )
     * @returns Double value estimate of the cutoff such that a specified fraction of the data added to this TDigest would be less than or equal to the cutoff
     */
    quantile(key, quantile) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomTdigestCommander.quantile(key, quantile);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Returns the fraction of all points added which are <= value
     * @param key The name of the sketch
     * @param value Upper limit for which the fraction of all points added which are <= value
     * @returns Returns compression, capacity, total merged and unmerged nodes, the total compressions made up to date on that key, and merged and unmerged weight
     */
    cdf(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomTdigestCommander.cdf(key, value);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Returns compression, capacity, total merged and unmerged nodes, the total compressions made up to date on that key, and merged and unmerged weight.
     * @param key The name of the sketch
     */
    info(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.bloomTdigestCommander.info(key);
            const response = yield this.sendCommand(command);
            return this.handleResponse(response);
        });
    }
}
exports.RedisBloomTDigest = RedisBloomTDigest;
