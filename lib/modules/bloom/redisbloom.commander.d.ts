import { BFReserveParameter, BFInsertParameters } from "./redisbloom.types";
import { CommandData } from "../module.base";
export declare class BloomCommander {
    /**
     * Creating an empty Bloom filter with a given desired error ratio and initial capacity.
     * @param key The key under which the filter is to be found
     * @param errorRate The desired probability for false positives. This should be a decimal value between 0 and 1. For example, for a desired false positive rate of 0.1% (1 in 1000), error_rate should be set to 0.001. The closer this number is to zero, the greater the memory consumption per item and the more CPU usage per operation.
     * @param capacity The number of entries you intend to add to the filter. Performance will begin to degrade after adding more items than this number. The actual degradation will depend on how far the limit has been exceeded. Performance will degrade linearly as the number of entries grow exponentially.
     * @param options The additional optional parameters
     */
    reserve(key: string, errorRate: number, capacity: number, options?: BFReserveParameter): CommandData;
    /**
     * Adding an item to the Bloom Filter, creating the filter if it does not yet exist.
     * @param key The key of the 'BF.ADD' command
     * @param item The item of the 'BF.ADD' command
     */
    add(key: string, item: string): CommandData;
    /**
     * Adding one or more items to the Bloom Filter, creating the filter if it does not yet exist. This command operates identically to BF.ADD except it allows multiple inputs and returns multiple values     * @param key
     * @param items The items of the 'BF.MADD' command
     */
    madd(key: string, items: string[]): CommandData;
    /**
     * Adding one or more items to the bloom filter, by default creating it if it does not yet exist. There are several arguments which may be used to modify this behavior.
     * @param key The key of the 'BF.INSERT' command
     * @param items The items of the 'BF.INSERT' command
     * @param options The additional optional parameters of the 'BF.INSERT' command
     */
    insert(key: string, items: string[], options?: BFInsertParameters): CommandData;
    /**
     * Determining whether an item may exist in the Bloom Filter or not.
     * @param key The key of the 'BF.EXISTS' command
     * @param item The key of the 'BF.EXISTS' command
     */
    exists(key: string, item: string): CommandData;
    /**
     * Determining if one or more items may exist in the filter or not.
     * @param key The key of the 'BF.MEXISTS' command
     * @param items The items of the 'BF.MEXISTS' command
     */
    mexists(key: string, items: string[]): CommandData;
    /**
     * Begining an incremental save of the bloom filter
     * @param key The key of the 'BF.SCANDUMP' command
     * @param iterator The iterator of the 'BF.SCANDUMP' command
     */
    scandump(key: string, iterator: number): CommandData;
    /**
     * Restoring a filter previously saved using SCANDUMP.
     * @param key The key of the 'BF.LOADCHUNK' command
     * @param iterator The iterator of the 'BF.LOADCHUNK' command
     * @param data The data of the 'BF.LOADCHUNK' command
     */
    loadchunk(key: string, iterator: number, data: string): CommandData;
    /**
     * Returning information about a key
     * @param key The key of the 'BF.INFO' command
     */
    info(key: string): CommandData;
}
