import * as Redis from 'ioredis';
import { Module, RedisModuleOptions } from '../module.base';
import { TOPKIncrbyItems, TOPKResponse } from './redisbloom-topk.types';
export declare class RedisBloomTopK extends Module {
    private bloomTopkCommander;
    /**
     * Initializing the module object
     * @param name The name of the module
     * @param clusterNodes The nodes of the cluster
     * @param moduleOptions The additional module options
     * @param moduleOptions.isHandleError If to throw error on error
     * @param moduleOptions.showDebugLogs If to print debug logs
     * @param clusterOptions The options of the clusters
     */
    constructor(clusterNodes: Redis.ClusterNode[], moduleOptions?: RedisModuleOptions, clusterOptions?: Redis.ClusterOptions);
    /**
     * Initializing the module object
     * @param name The name of the module
     * @param redisOptions The options of the redis database
     * @param moduleOptions The additional module options
     * @param moduleOptions.isHandleError If to throw error on error
     * @param moduleOptions.showDebugLogs If to print debug logs
     */
    constructor(redisOptions: Redis.RedisOptions, moduleOptions?: RedisModuleOptions);
    /**
     * Initializing a TopK with specified parameters
     * @param key The key under which the sketch is to be found.
     * @param topk The number of top occurring items to keep.
     * @param width The number of counters kept in each array.
     * @param depth The number of arrays.
     * @param decay The probability of reducing a counter in an occupied bucket. It is raised to power of it's counter (decay ^ bucket[i].counter). Therefore, as the counter gets higher, the chance of a reduction is being reduced.
     */
    reserve(key: string, topk: number, width: number, depth: number, decay: number): Promise<'OK'>;
    /**
     * Adding an item to the data structure.
     * @param key Name of sketch where item is added.
     * @param items Item/s to be added.
     */
    add(key: string, items: (number | string)[]): Promise<string[]>;
    /**
     * Increases the count of item's by increment.
     * @param key The name of the sketch.
     * @param items A list of item and increment set's
     */
    incrby(key: string, items: TOPKIncrbyItems[]): Promise<string[]>;
    /**
     * Checking whether an item is one of Top-K items.
     * @param key Name of sketch where item is queried.
     * @param items Item/s to be queried.
     */
    query(key: string, items: (string | number)[]): Promise<TOPKResponse[]>;
    /**
     * Returning count for an item.
     * @param key Name of sketch where item is counted.
     * @param items Item/s to be counted.
     */
    count(key: string, items: (string | number)[]): Promise<number[]>;
    /**
     * Returning full list of items in Top K list.
     * @param key Name of sketch where item is counted.
     */
    list(key: string): Promise<(string | number)[]>;
    /**
     * Returning information about a key
     * @param key Name of sketch.
     */
    info(key: string): Promise<(string | number)[]>;
}
