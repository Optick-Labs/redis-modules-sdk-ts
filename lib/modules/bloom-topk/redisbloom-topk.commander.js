"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloomTopkCommander = void 0;
class BloomTopkCommander {
    /**
     * Initializing a TopK with specified parameters
     * @param key The key under which the sketch is to be found.
     * @param topk The number of top occurring items to keep.
     * @param width The number of counters kept in each array.
     * @param depth The number of arrays.
     * @param decay The probability of reducing a counter in an occupied bucket. It is raised to power of it's counter (decay ^ bucket[i].counter). Therefore, as the counter gets higher, the chance of a reduction is being reduced.
     */
    reserve(key, topk, width, depth, decay) {
        return {
            command: 'TOPK.RESERVE',
            args: [key, topk, width, depth, decay]
        };
    }
    /**
     * Adding an item to the data structure.
     * @param key Name of sketch where item is added.
     * @param items Item/s to be added.
     */
    add(key, items) {
        const args = [key].concat(items);
        return {
            command: 'TOPK.ADD',
            args: args
        };
    }
    /**
     * Increases the count of item's by increment.
     * @param key The name of the sketch.
     * @param items A list of item and increment set's
     */
    incrby(key, items) {
        let args = [key];
        for (const item of items) {
            args = args.concat([item.name.toString(), item.increment.toString()]);
        }
        return {
            command: 'TOPK.INCRBY',
            args: args
        };
    }
    /**
     * Checking whether an item is one of Top-K items.
     * @param key Name of sketch where item is queried.
     * @param items Item/s to be queried.
     */
    query(key, items) {
        const args = [key].concat(items);
        return {
            command: 'TOPK.QUERY',
            args: args
        };
    }
    /**
     * Returning count for an item.
     * @param key Name of sketch where item is counted.
     * @param items Item/s to be counted.
     */
    count(key, items) {
        const args = [key].concat(items);
        return {
            command: 'TOPK.COUNT',
            args: args
        };
    }
    /**
     * Returning full list of items in Top K list.
     * @param key Name of sketch where item is counted.
     */
    list(key) {
        return {
            command: 'TOPK.LIST',
            args: [key]
        };
    }
    /**
     * Returning information about a key
     * @param key Name of sketch.
     */
    info(key) {
        return {
            command: 'TOPK.INFO',
            args: [key]
        };
    }
}
exports.BloomTopkCommander = BloomTopkCommander;
