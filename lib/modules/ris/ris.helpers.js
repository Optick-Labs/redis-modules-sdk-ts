"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisIntervalSetsHelpers = void 0;
class RedisIntervalSetsHelpers {
    /**
     * Parsing the iset.get command response
     * @param sets The list of sets
     */
    parseGet(sets) {
        const parsedSets = [];
        for (const set of sets) {
            if (set.length > 2) {
                parsedSets.push({ name: set[0], minimum: parseInt(set[1]), maximum: parseInt(set[2]) });
            }
            else {
                return [{ minimum: parseInt(set[0]), maximum: parseInt(set[1]) }];
            }
        }
        return parsedSets;
    }
}
exports.RedisIntervalSetsHelpers = RedisIntervalSetsHelpers;
