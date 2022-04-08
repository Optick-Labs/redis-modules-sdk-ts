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
exports.RedisIntervalSets = void 0;
const module_base_1 = require("../module.base");
const ris_commander_1 = require("./ris.commander");
const ris_helpers_1 = require("./ris.helpers");
class RedisIntervalSets extends module_base_1.Module {
    constructor(options, moduleOptions, clusterOptions) {
        super(RedisIntervalSets.name, options, moduleOptions, clusterOptions);
        this.risHelpers = new ris_helpers_1.RedisIntervalSetsHelpers();
        this.risCommander = new ris_commander_1.RedisIntervalSetsCommander();
    }
    /**
     * Adding an interval set
     * @param key The name of the key
     * @param sets A list of sets to create. At least 1 set is required.
     */
    add(key, sets) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.risCommander.add(key, sets);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving all of key interval sets/a single set.
     * @param key The name of the key
     * @param setName Optional. The name of specific set. If not passed all interval sets under key will be retrieved.
     */
    get(key, setName) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.risCommander.get(key, setName);
            const response = yield this.sendCommand(command);
            return this.risHelpers.parseGet(response);
        });
    }
    /**
     * Deleting a all interval sets under a key, or a single/list of specific set/s.
     * @param key The name of the key
     * @param setNames Optional. A list of set names to delete. If not passed all interval sets under key will be removed.
     */
    del(key, setNames) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.risCommander.del(key, setNames);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving all sets under a key that have a specific score in their range.
     * @param key The name of the key
     * @param score The score of the set
     */
    score(key, score) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.risCommander.score(key, score);
            return yield this.sendCommand(command);
        });
    }
    /**
     * Retrieving all sets under a key that don't have a specific score in their range.
     * @param key The name of the key
     * @param score The score of the set
     */
    notScore(key, score) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.risCommander.notScore(key, score);
            return yield this.sendCommand(command);
        });
    }
}
exports.RedisIntervalSets = RedisIntervalSets;
