"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloomCuckooCommander = void 0;
var BloomCuckooCommander = /** @class */ (function () {
    function BloomCuckooCommander() {
    }
    /**
     * Creating an empty Bloom Cuckoo filter with a given initial capacity.
     * @param key The key under which the filter is to be found
     * @param capacity The number of entries you intend to add to the filter. Performance will begin to degrade after adding more items than this number. The actual degradation will depend on how far the limit has been exceeded. Performance will degrade linearly as the number of entries grow exponentially.
     * @param options The additional optional parameters
     */
    BloomCuckooCommander.prototype.reserve = function (key, capacity, options) {
        var args = [key, capacity];
        if (options && options.bucketSize)
            args = args.concat(['BUCKETSIZE', options.bucketSize]);
        if (options && options.maxIteractions)
            args = args.concat(['MAXITERATIONS', options.maxIteractions]);
        if (options && options.expansion)
            args = args.concat(['EXPANSION', options.expansion]);
        return {
            command: 'CF.RESERVE',
            args: args
        };
    };
    /**
     * Adding an item to the cuckoo filter, creating the filter if it does not exist.
     * @param key The name of the filter
     * @param item The item to add
     */
    BloomCuckooCommander.prototype.add = function (key, item) {
        return {
            command: 'CF.ADD',
            args: [key, item]
        };
    };
    /**
     * Adding an item to a cuckoo filter if the item did not exist previously.
     * @param key The name of the filter
     * @param item The item to add
     */
    BloomCuckooCommander.prototype.addnx = function (key, item) {
        return {
            command: 'CF.ADDNX',
            args: [key, item]
        };
    };
    /**
     * Adding one or more items to a cuckoo filter, allowing the filter to be created with a custom capacity if it does not yet exist.
     * @param key The name of the filter
     * @param items Begin the list of items to add
     * @param options The additional optional parameters of the 'CF.INSERT' command
     */
    BloomCuckooCommander.prototype.insert = function (key, items, options) {
        var args = [key];
        if (options !== undefined && options.capacity !== undefined)
            args = args.concat(['CAPACITY', options.capacity.toString()]);
        if (options !== undefined && options.nocreate !== undefined)
            args.push('NOCREATE');
        args = args.concat(['ITEMS']).concat(items);
        return {
            command: 'CF.INSERT',
            args: args
        };
    };
    /**
     * Adding one or more items to a cuckoo filter, allowing the filter to be created with a custom capacity if it does not yet exist.
     * @param key The name of the filter
     * @param items The items of the 'CF.INSERT' command
     * @param options The additional optional parameters of the 'CF.INSERTNX' command
     */
    BloomCuckooCommander.prototype.insertnx = function (key, items, options) {
        var args = [key];
        if (options !== undefined && options.capacity !== undefined)
            args = args.concat(['CAPACITY', options.capacity.toString()]);
        if (options !== undefined && options.nocreate !== undefined)
            args.push('NOCREATE');
        args = args.concat(['ITEMS']).concat(items);
        return {
            command: 'CF.INSERTNX',
            args: args
        };
    };
    /**
     * Determining whether an item may exist in the Cuckoo Filter or not.
     * @param key The name of the filter
     * @param item The item to check for
     */
    BloomCuckooCommander.prototype.exists = function (key, item) {
        return {
            command: 'CF.EXISTS',
            args: [key, item]
        };
    };
    /**
     * Deleting an item once from the filter. If the item exists only once, it will be removed from the filter.
     * @param key The name of the filter
     * @param item The item to delete from the filter
     */
    BloomCuckooCommander.prototype.del = function (key, item) {
        return {
            command: 'CF.DEL',
            args: [key, item]
        };
    };
    /**
     * Returning the number of times an item may be in the filter.
     * @param key The name of the filter
     * @param item The item to count
     */
    BloomCuckooCommander.prototype.count = function (key, item) {
        return {
            command: 'CF.COUNT',
            args: [key, item]
        };
    };
    /**
     * Begining an incremental save of the Cuckoo filter
     * @param key The name of the filter
     * @param iterator Iterator value. This is either 0, or the iterator from a previous invocation of this command
     */
    BloomCuckooCommander.prototype.scandump = function (key, iterator) {
        return {
            command: 'CF.SCANDUMP',
            args: [key, iterator]
        };
    };
    /**
     * Restoring a filter previously saved using SCANDUMP.
     * @param key The name of the key to restore
     * @param iterator The iterator value associated with data (returned by SCANDUMP )
     * @param data The current data chunk (returned by SCANDUMP )
     */
    BloomCuckooCommander.prototype.loadchunk = function (key, iterator, data) {
        return {
            command: 'CF.LOADCHUNK',
            args: [key, iterator, data]
        };
    };
    /**
     * Returning information about a key
     * @param key The name of the filter
     */
    BloomCuckooCommander.prototype.info = function (key) {
        return {
            command: 'CF.INFO',
            args: [key]
        };
    };
    return BloomCuckooCommander;
}());
exports.BloomCuckooCommander = BloomCuckooCommander;
