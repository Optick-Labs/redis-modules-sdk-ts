"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloomTopkCommander = void 0;
var BloomTopkCommander = /** @class */ (function () {
    function BloomTopkCommander() {
    }
    /**
     * Initializing a TopK with specified parameters
     * @param key The key under which the sketch is to be found.
     * @param topk The number of top occurring items to keep.
     * @param width The number of counters kept in each array.
     * @param depth The number of arrays.
     * @param decay The probability of reducing a counter in an occupied bucket. It is raised to power of it's counter (decay ^ bucket[i].counter). Therefore, as the counter gets higher, the chance of a reduction is being reduced.
     */
    BloomTopkCommander.prototype.reserve = function (key, topk, width, depth, decay) {
        return {
            command: 'TOPK.RESERVE',
            args: [key, topk, width, depth, decay]
        };
    };
    /**
     * Adding an item to the data structure.
     * @param key Name of sketch where item is added.
     * @param items Item/s to be added.
     */
    BloomTopkCommander.prototype.add = function (key, items) {
        var args = [key].concat(items);
        return {
            command: 'TOPK.ADD',
            args: args
        };
    };
    /**
     * Increases the count of item's by increment.
     * @param key The name of the sketch.
     * @param items A list of item and increment set's
     */
    BloomTopkCommander.prototype.incrby = function (key, items) {
        var args = [key];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            args = args.concat([item.name.toString(), item.increment.toString()]);
        }
        return {
            command: 'TOPK.INCRBY',
            args: args
        };
    };
    /**
     * Checking whether an item is one of Top-K items.
     * @param key Name of sketch where item is queried.
     * @param items Item/s to be queried.
     */
    BloomTopkCommander.prototype.query = function (key, items) {
        var args = [key].concat(items);
        return {
            command: 'TOPK.QUERY',
            args: args
        };
    };
    /**
     * Returning count for an item.
     * @param key Name of sketch where item is counted.
     * @param items Item/s to be counted.
     */
    BloomTopkCommander.prototype.count = function (key, items) {
        var args = [key].concat(items);
        return {
            command: 'TOPK.COUNT',
            args: args
        };
    };
    /**
     * Returning full list of items in Top K list.
     * @param key Name of sketch where item is counted.
     */
    BloomTopkCommander.prototype.list = function (key) {
        return {
            command: 'TOPK.LIST',
            args: [key]
        };
    };
    /**
     * Returning information about a key
     * @param key Name of sketch.
     */
    BloomTopkCommander.prototype.info = function (key) {
        return {
            command: 'TOPK.INFO',
            args: [key]
        };
    };
    return BloomTopkCommander;
}());
exports.BloomTopkCommander = BloomTopkCommander;
