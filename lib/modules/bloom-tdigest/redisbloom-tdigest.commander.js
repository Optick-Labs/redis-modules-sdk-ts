"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloomTdigestCommander = void 0;
var BloomTdigestCommander = /** @class */ (function () {
    function BloomTdigestCommander() {
    }
    /**
     * Allocate the memory and initialize the t-digest
     * @param key The name of the sketch
     * @param compression The compression parameter. 100 is a common value for normal uses. 1000 is extremely large. See the further notes bellow.
     * @returns OK on success, error otherwise
     */
    BloomTdigestCommander.prototype.create = function (key, compression) {
        return {
            command: 'TDIGEST.CREATE',
            args: [key, "".concat(compression)]
        };
    };
    /**
     * Reset the sketch to zero - empty out the sketch and re-initialize it
     * @param key The name of the sketch
     * @returns OK on success, error otherwise
     */
    BloomTdigestCommander.prototype.reset = function (key) {
        return {
            command: 'TDIGEST.RESET',
            args: [key]
        };
    };
    /**
     * Adds one or more samples to a sketch
     * @param key The name of the sketch
     * @param parameters The parameters of the command
     * @returns OK on success, error otherwise
     */
    BloomTdigestCommander.prototype.add = function (key, parameters) {
        var args = [key];
        for (var _i = 0, parameters_1 = parameters; _i < parameters_1.length; _i++) {
            var pair = parameters_1[_i];
            args = args.concat(["".concat(pair.value), "".concat(pair.weight)]);
        }
        return {
            command: 'TDIGEST.ADD',
            args: args
        };
    };
    /**
     * Merges all of the values from 'from' to 'this' sketch
     * @param fromKey Sketch to copy values to
     * @param toKey Sketch to copy values from
     * @returns OK on success, error otherwise
     */
    BloomTdigestCommander.prototype.merge = function (fromKey, toKey) {
        return {
            command: 'TDIGEST.MERGE',
            args: [toKey, fromKey]
        };
    };
    /**
     * Get minimum value from the sketch. Will return DBL_MAX if the sketch is empty
     * @param key The name of the sketch
     * @returns DBL_MAX if the sketch is empty
     */
    BloomTdigestCommander.prototype.min = function (key) {
        return {
            command: 'TDIGEST.MIN',
            args: [key]
        };
    };
    /**
     * Get maximum value from the sketch. Will return DBL_MIN if the sketch is empty
     * @param key The name of the sketch
     * @returns DBL_MIN if the sketch is empty
     */
    BloomTdigestCommander.prototype.max = function (key) {
        return {
            command: 'TDIGEST.MAX',
            args: [key]
        };
    };
    /**
     * Returns an estimate of the cutoff such that a specified fraction of the data added to this TDigest would be less than or equal to the cutoff
     * @param key The name of the sketch
     * @param quantile The desired fraction ( between 0 and 1 inclusively )
     * @returns Double value estimate of the cutoff such that a specified fraction of the data added to this TDigest would be less than or equal to the cutoff
     */
    BloomTdigestCommander.prototype.quantile = function (key, quantile) {
        return {
            command: 'TDIGEST.QUANTILE',
            args: [key, quantile]
        };
    };
    /**
     * Returns the fraction of all points added which are <= value
     * @param key The name of the sketch
     * @param value Upper limit for which the fraction of all points added which are <= value
     * @returns Returns compression, capacity, total merged and unmerged nodes, the total compressions made up to date on that key, and merged and unmerged weight
     */
    BloomTdigestCommander.prototype.cdf = function (key, value) {
        return {
            command: 'TDIGEST.CDF',
            args: [key, value]
        };
    };
    /**
     * Returns compression, capacity, total merged and unmerged nodes, the total compressions made up to date on that key, and merged and unmerged weight.
     * @param key The name of the sketch
     */
    BloomTdigestCommander.prototype.info = function (key) {
        return {
            command: 'TDIGEST.INFO',
            args: [key]
        };
    };
    return BloomTdigestCommander;
}());
exports.BloomTdigestCommander = BloomTdigestCommander;
