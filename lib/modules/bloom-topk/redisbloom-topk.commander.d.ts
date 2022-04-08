import { CommandData } from "../module.base";
import { TOPKIncrbyItems } from "./redisbloom-topk.types";
export declare class BloomTopkCommander {
    /**
     * Initializing a TopK with specified parameters
     * @param key The key under which the sketch is to be found.
     * @param topk The number of top occurring items to keep.
     * @param width The number of counters kept in each array.
     * @param depth The number of arrays.
     * @param decay The probability of reducing a counter in an occupied bucket. It is raised to power of it's counter (decay ^ bucket[i].counter). Therefore, as the counter gets higher, the chance of a reduction is being reduced.
     */
    reserve(key: string, topk: number, width: number, depth: number, decay: number): CommandData;
    /**
     * Adding an item to the data structure.
     * @param key Name of sketch where item is added.
     * @param items Item/s to be added.
     */
    add(key: string, items: (number | string)[]): CommandData;
    /**
     * Increases the count of item's by increment.
     * @param key The name of the sketch.
     * @param items A list of item and increment set's
     */
    incrby(key: string, items: TOPKIncrbyItems[]): CommandData;
    /**
     * Checking whether an item is one of Top-K items.
     * @param key Name of sketch where item is queried.
     * @param items Item/s to be queried.
     */
    query(key: string, items: (string | number)[]): CommandData;
    /**
     * Returning count for an item.
     * @param key Name of sketch where item is counted.
     * @param items Item/s to be counted.
     */
    count(key: string, items: (string | number)[]): CommandData;
    /**
     * Returning full list of items in Top K list.
     * @param key Name of sketch where item is counted.
     */
    list(key: string): CommandData;
    /**
     * Returning information about a key
     * @param key Name of sketch.
     */
    info(key: string): CommandData;
}
