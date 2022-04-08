"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisIntervalSetsHelpers = void 0;
var RedisIntervalSetsHelpers = /** @class */ (function () {
    function RedisIntervalSetsHelpers() {
    }
    /**
     * Parsing the iset.get command response
     * @param sets The list of sets
     */
    RedisIntervalSetsHelpers.prototype.parseGet = function (sets) {
        var parsedSets = [];
        for (var _i = 0, sets_1 = sets; _i < sets_1.length; _i++) {
            var set = sets_1[_i];
            if (set.length > 2) {
                parsedSets.push({ name: set[0], minimum: parseInt(set[1]), maximum: parseInt(set[2]) });
            }
            else {
                return [{ minimum: parseInt(set[0]), maximum: parseInt(set[1]) }];
            }
        }
        return parsedSets;
    };
    return RedisIntervalSetsHelpers;
}());
exports.RedisIntervalSetsHelpers = RedisIntervalSetsHelpers;
