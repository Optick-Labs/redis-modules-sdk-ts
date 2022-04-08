"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloomCmkCommander = void 0;
var BloomCmkCommander = /** @class */ (function () {
    function BloomCmkCommander() {
    }
    /**
     * Initializes a Count-Min Sketch to dimensions specified by user.
     * @param key The name of the sketch.
     * @param width The number of counter in each array. Reduces the error size.
     * @param depth The number of counter-arrays. Reduces the probability for an error of a certain size (percentage of total count).
     */
    BloomCmkCommander.prototype.initbydim = function (key, width, depth) {
        return {
            command: 'CMS.INITBYDIM',
            args: [key, width, depth]
        };
    };
    /**
     * Initializes a Count-Min Sketch to accommodate requested capacity.
     * @param key The name of the sketch.
     * @param errorSize Estimate size of error. The error is a percent of total counted items. This effects the width of the sketch.
     * @param probability The desired probability for inflated count.
     */
    BloomCmkCommander.prototype.initbyprob = function (key, errorSize, probability) {
        return {
            command: 'CMS.INITBYPROB',
            args: [key, errorSize, probability]
        };
    };
    /**
     * Increases the count of item's by increment.
     * @param key The name of the sketch.
     * @param items A list of item and increment set's
     */
    BloomCmkCommander.prototype.incrby = function (key, items) {
        var args = [key];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            args = args.concat([item.name.toString(), item.increment.toString()]);
        }
        return {
            command: 'CMS.INCRBY',
            args: args
        };
    };
    /**
     * Returns count for item's.
     * @param key The name of the sketch.
     * @param items A list of items.
     */
    BloomCmkCommander.prototype.query = function (key, items) {
        return {
            command: 'CMS.QUERY',
            args: [key].concat(items)
        };
    };
    /**
     * Merges several sketches into one sketch.
     * @param dest The name of destination sketch.
     * @param numKeys The number of sketches to be merged.
     * @param sources The names of source sketches to be merged.
     * @param weights A multiple of each sketch. Default =1.
     */
    BloomCmkCommander.prototype.merge = function (dest, numKeys, sources, weights) {
        var args = [dest, numKeys];
        args = args.concat(sources);
        if (weights !== undefined && weights.length > 0) {
            args.push('WEIGHTS');
            for (var _i = 0, weights_1 = weights; _i < weights_1.length; _i++) {
                var weight = weights_1[_i];
                args.push("".concat(weight));
            }
        }
        return {
            command: 'CMS.MERGE',
            args: args
        };
    };
    /**
     * Returning information about a key
     * @param key The key of the 'CMS.INFO' command
     */
    BloomCmkCommander.prototype.info = function (key) {
        return {
            command: 'CMS.INFO',
            args: [key]
        };
    };
    return BloomCmkCommander;
}());
exports.BloomCmkCommander = BloomCmkCommander;
