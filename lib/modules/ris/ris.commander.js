"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisIntervalSetsCommander = void 0;
var RedisIntervalSetsCommander = /** @class */ (function () {
    function RedisIntervalSetsCommander() {
    }
    /**
     * Adding an interval set
     * @param key The name of the key
     * @param sets A list of sets to create. At least 1 set is required.
     */
    RedisIntervalSetsCommander.prototype.add = function (key, sets) {
        var args = [key];
        for (var _i = 0, sets_1 = sets; _i < sets_1.length; _i++) {
            var set = sets_1[_i];
            args = args.concat([set.name, set.minimum, set.maximum]);
        }
        return {
            command: 'iset.add',
            args: args
        };
    };
    /**
     * Retrieving all of key interval sets/a single set.
     * @param key The name of the key
     * @param setName Optional. The name of specific set. If not passed all interval sets under key will be retrieved.
     */
    RedisIntervalSetsCommander.prototype.get = function (key, setName) {
        var args = [key];
        if (setName) {
            args.push(setName);
        }
        return {
            command: 'iset.get',
            args: args
        };
    };
    /**
     * Deleting a all interval sets under a key, or a single/list of specific set/s.
     * @param key The name of the key
     * @param setNames Optional. A list of set names to delete. If not passed all interval sets under key will be removed.
     */
    RedisIntervalSetsCommander.prototype.del = function (key, setNames) {
        return {
            command: 'iset.del',
            args: [key].concat(setNames)
        };
    };
    /**
     * Retrieving all sets under a key that have a specific score in their range.
     * @param key The name of the key
     * @param score The score of the set
     */
    RedisIntervalSetsCommander.prototype.score = function (key, score) {
        return {
            command: 'iset.score',
            args: [key, score]
        };
    };
    /**
     * Retrieving all sets under a key that don't have a specific score in their range.
     * @param key The name of the key
     * @param score The score of the set
     */
    RedisIntervalSetsCommander.prototype.notScore = function (key, score) {
        return {
            command: 'iset.not_score',
            args: [key, score]
        };
    };
    return RedisIntervalSetsCommander;
}());
exports.RedisIntervalSetsCommander = RedisIntervalSetsCommander;
